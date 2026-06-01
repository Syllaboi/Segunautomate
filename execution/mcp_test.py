import os
import sys
import json
import urllib.request
import urllib.error
import threading
import time

env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('N8N_MCP_TOKEN='):
                os.environ['N8N_MCP_TOKEN'] = line.strip().split('=', 1)[1]

TOKEN = os.environ.get('N8N_MCP_TOKEN')
BASE_URL = 'https://syllaboi-n8n-free.hf.space/mcp-server/http'

def main(method, args):
    req = urllib.request.Request(BASE_URL, headers={
        'Authorization': f'Bearer {TOKEN}',
        'Accept': 'text/event-stream'
    })
    
    post_url = None
    
    def read_sse():
        nonlocal post_url
        with urllib.request.urlopen(req) as response:
            for line in response:
                line = line.decode('utf-8').strip()
                if line.startswith('event: endpoint'):
                    # The next line should be data: <uri>
                    data_line = response.readline().decode('utf-8').strip()
                    if data_line.startswith('data: '):
                        uri = data_line[6:]
                        if uri.startswith('http'):
                            post_url = uri
                        else:
                            # It's a relative URI
                            from urllib.parse import urlparse
                            parsed = urlparse(BASE_URL)
                            post_url = f"{parsed.scheme}://{parsed.netloc}{uri}"
                        break
    
    t = threading.Thread(target=read_sse)
    t.daemon = True
    t.start()
    
    # Wait for post_url
    for _ in range(50):
        if post_url: break
        time.sleep(0.1)
        
    if not post_url:
        print("Failed to get endpoint from SSE stream")
        sys.exit(1)
        
    # Now send the POST request
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": method
    }
    if args:
        payload["params"] = {"name": method.split('/')[-1], "arguments": args} if "tools/call" == method else args
        
    post_req = urllib.request.Request(post_url, data=json.dumps(payload).encode('utf-8'), headers={
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json'
    }, method='POST')
    
    try:
        with urllib.request.urlopen(post_req) as response:
            # The POST request usually returns empty or 202 Accepted.
            # We must wait for the SSE stream to output the result!
            print("POST successful, wait for SSE result...")
    except Exception as e:
        print(f"Error POSTing: {e}")
        
if __name__ == '__main__':
    method = sys.argv[1]
    args = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    main(method, args)
