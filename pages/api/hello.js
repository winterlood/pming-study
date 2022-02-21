// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const secret_key = "secret_URG8Ad5QHyCqrIeQVN1WVvf0q6ix5pkXIHiTa1ZVa6j";

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
