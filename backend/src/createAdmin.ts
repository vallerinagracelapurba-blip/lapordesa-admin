
import bcrypt from "bcrypt";
import db from "./config/db.js";

async function createAdmin() {
  const nama = "Admin LaporDesa";
  const email = "admin@lapordesa.com";

  const password = "AdminLaporDesa2026";

  try {
    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if ((existing as { id: number }[]).length > 0) {
      console.log("Akun dengan email tersebut sudah ada.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.query(
      `INSERT INTO users (nama, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [nama, email, hashedPassword, "admin"]
    );

    console.log("Akun admin berhasil dibuat.");
    console.log(`Email: ${email}`);
    console.log("Gunakan password yang kamu atur di script.");
  } catch (error) {
    console.error("Gagal membuat akun admin:", error);
  } finally {
    await db.end();
  }
}

createAdmin();
