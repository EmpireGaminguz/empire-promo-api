document.getElementById("getCodeBtn").addEventListener("click", async () => {
  const res = await fetch("/api/get-code");
  const data = await res.json();
  
  const promoDiv = document.getElementById("promoCode");
  const info = document.getElementById("info");

  if (data.success) {
    promoDiv.textContent = `Sizning promo kodingiz: ${data.code}`;
    info.textContent = "Ushbu kod faqat bir marta amal qiladi.";
  } else {
    promoDiv.textContent = "";
    info.textContent = data.message;
  }
});
