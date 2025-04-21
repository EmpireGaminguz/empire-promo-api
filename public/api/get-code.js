import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('./backend/codes.json');
const usedPath = path.resolve('./backend/used.json');

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const usedRaw = await fs.readFile(usedPath, 'utf-8');
  const usedData = JSON.parse(usedRaw);

  if (usedData[ip]) {
    return res.status(200).json({ success: false, message: 'Siz allaqachon promo kod olgansiz!' });
  }

  const codeRaw = await fs.readFile(filePath, 'utf-8');
  const codes = JSON.parse(codeRaw);

  if (codes.length === 0) {
    return res.status(200).json({ success: false, message: 'Barcha promo kodlar tugagan.' });
  }

  const code = codes.shift();
  usedData[ip] = code;

  await fs.writeFile(filePath, JSON.stringify(codes, null, 2));
  await fs.writeFile(usedPath, JSON.stringify(usedData, null, 2));

  return res.status(200).json({ success: true, code });
}
