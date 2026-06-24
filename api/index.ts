const API_BASE = "http://192.168.1.xxx:4000/api";

export async function createQrSession(merchantId: string) {
  const res = await fetch(`${API_BASE}/qr/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ merchantId })
  });
  return res.json();
}
