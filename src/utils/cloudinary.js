export async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;
  const signed = true; // use signed uploads by default when signature endpoint is present

  // Try signed uploads via Vercel function
  if (signed) {
    try {
      const sigRes = await fetch(`/api/cloudinary-signature?folder=${encodeURIComponent(folder || '')}`);
      if (!sigRes.ok) throw new Error('Signature request failed');
      const { timestamp, signature, cloudName: cName, apiKey, folder: sigFolder } = await sigRes.json();
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cName}/auto/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      if (sigFolder) formData.append('folder', sigFolder);

      const res = await fetch(uploadUrl, { method: 'POST', body: formData, mode: 'cors' });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message = data && data.error && data.error.message ? data.error.message : `HTTP ${res.status}`;
        throw new Error(`Cloudinary upload failed: ${message}`);
      }
      if (!data || !data.secure_url) {
        throw new Error('Cloudinary upload failed: No secure_url in response');
      }
      return data.secure_url;
    } catch (e) {
      console.warn('Signed upload failed, falling back if preset is configured:', e);
      // Fallback to unsigned preset if available
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || !uploadPreset) {
        throw e;
      }
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      if (folder) formData.append('folder', folder);
      const res = await fetch(url, { method: 'POST', body: formData, mode: 'cors' });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message = data && data.error && data.error.message ? data.error.message : `HTTP ${res.status}`;
        throw new Error(`Cloudinary upload failed: ${message}`);
      }
      if (!data || !data.secure_url) {
        throw new Error('Cloudinary upload failed: No secure_url in response');
      }
      return data.secure_url;
    }
  }

}
