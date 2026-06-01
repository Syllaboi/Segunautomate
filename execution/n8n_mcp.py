#!/usr/bin/env python3
import os
import sys
import json
import urllib.request
import urllib.error

# Load simple .env (assuming N8N_MCP_TOKEN is in it)
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('N8N_MCP_TOKEN='):
                os.environ['N8N_MCP_TOKEN'] = line.strip().split('=', 1)[1]

TOKEN = os.environ.get('N8N_MCP_TOKEN')
BASE_URL = 'https://syllaboi-n8n-free.hf.space/mcp-server/http'

def make_request(path, method='GET', payload=None):
    if not TOKEN:
        print("Error: N8N_MCP_TOKEN not found in .env")
        sys.exit(1)
        
    url = f"{BASE_URL.rstrip('/')}/{path.lstrip('/')}"
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Accept': 'application/json'
    }
    
    data = None
    if payload is not None:
        data = json.dumps(payload).encode('utf-8')
        headers['Content-Type'] = 'application/json'
        
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            body = response.read().decode('utf-8')
            try:
                return json.loads(body)
            except json.JSONDecodeError:
                return body
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 n8n_mcp.py <path> [method] [payload_json]")
        print("Example: python3 n8n_mcp.py tools")
        sys.exit(1)
        
    path = sys.argv[1]
    method = sys.argv[2] if len(sys.argv) > 2 else 'GET'
    payload = json.loads(sys.argv[3]) if len(sys.argv) > 3 else None
    
    result = make_request(path, method, payload)
    if isinstance(result, str):
        print(result)
    else:
        print(json.dumps(result, indent=2))
