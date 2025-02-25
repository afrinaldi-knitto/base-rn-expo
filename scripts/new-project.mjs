import { input, select } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

function isValidPackageName(pkgName) {
  const regex = /^[a-z0-9]+(\.[a-z0-9]+)+$/;
  return regex.test(pkgName);
}

function isValidAppName(name) {
  return /^(?!.*\s{2,})(?!^-)(?!.*-$)[A-Za-z0-9](?:[A-Za-z0-9\s-]*[A-Za-z0-9])?$/.test(
    name
  );
}

function generateSlug(appName) {
  return appName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateScheme(appName) {
  return appName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function insertFlavorConfig(gradleContent, flavorConfig) {
  const androidIndex = gradleContent.indexOf("android {");
  if (androidIndex === -1) {
    console.error("Blok 'android {' tidak ditemukan dalam build.gradle.");
    return gradleContent;
  }
  let count = 0;
  let endIndex = -1;
  for (let i = androidIndex; i < gradleContent.length; i++) {
    const char = gradleContent[i];
    if (char === "{") {
      count++;
    } else if (char === "}") {
      count--;
      if (count === 0) {
        endIndex = i;
        break;
      }
    }
  }
  if (endIndex === -1) {
    console.error("Penutup blok 'android { }' tidak ditemukan.");
    return gradleContent;
  }
  return (
    gradleContent.slice(0, endIndex) +
    flavorConfig +
    gradleContent.slice(endIndex)
  );
}

function deleteEnvFiles(root) {
  const files = fs.readdirSync(root);
  files.forEach((file) => {
    if (file === ".env" || file.startsWith(".env.")) {
      try {
        fs.rmSync(path.join(root, file), { force: true, recursive: true });
        console.log(`🗑️  File ${file} dihapus.`);
      } catch (err) {
        console.error(`Error menghapus ${file}: ${err}`);
      }
    }
  });
}

async function selectYesNo(message) {
  return await select({
    message,
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });
}

async function promptFlavors() {
  let flavors = [];
  let addMore = true;
  while (addMore) {
    const flavorName = await input({
      message: "Masukkan nama flavor (contoh: paid):",
    });
    const trimmed = flavorName.trim();
    if (trimmed === "") {
      console.error("Flavor tidak boleh kosong, silakan masukkan kembali.");
      continue;
    }
    if (!/^[a-z0-9]+$/.test(trimmed)) {
      console.error(
        "Flavor harus berupa satu kata dengan huruf kecil dan angka, tanpa spasi atau karakter khusus."
      );
      continue;
    }
    if (trimmed === "development") {
      console.error(
        "Flavor 'development' tidak boleh digunakan sebagai input."
      );
      continue;
    }
    if (flavors.includes(trimmed)) {
      console.error("Flavor ini sudah dimasukkan, silakan masukkan nama lain.");
      continue;
    }
    flavors.push(trimmed);
    addMore = await selectYesNo(
      "Apakah anda ingin membuat product flavors lain?"
    );
  }
  return flavors;
}

async function createProject() {
  while (true) {
    let appName = "";
    while (true) {
      appName = await input({
        message:
          "Masukkan nama aplikasi yang ingin dibuat (contoh: Base RN Expo):",
        initial: "Base RN Expo",
      });
      if (!isValidAppName(appName.trim())) {
        console.error(
          "Nama aplikasi tidak valid. Pastikan hanya mengandung huruf, angka, spasi, dan strip (-), tidak diawali/diakhiri dengan strip, dan tidak ada spasi berurutan."
        );
      } else {
        break;
      }
    }

    let packageName = "";
    while (true) {
      packageName = await input({
        message:
          "Masukkan package name yang ingin dibuat (contoh: com.base.expo):",
        initial: "com.base.expo",
      });
      if (packageName.trim() === "") {
        console.error("Package name tidak boleh kosong.");
      } else if (!isValidPackageName(packageName.trim())) {
        console.error(
          "Package name tidak valid. Pastikan semua huruf kecil, tidak ada underscore, dan dipisahkan oleh titik."
        );
      } else {
        break;
      }
    }

    const hasFlavors = await selectYesNo(
      "Apakah Anda ingin membuat product flavors?"
    );

    let userFlavors = [];
    if (hasFlavors) {
      userFlavors = await promptFlavors();
    }
    const finalFlavors = hasFlavors ? ["development", ...userFlavors] : [];

    console.log("\n--- Summary Konfigurasi ---");
    console.log(`Nama Aplikasi: ${appName.trim()}`);
    console.log(`Package Name: ${packageName.trim()}`);
    if (hasFlavors) {
      console.log(`Product Flavors: ${finalFlavors.join(", ")}`);
    } else {
      console.log("Product Flavors: Tidak dibuat");
    }
    console.log("---------------------------\n");

    const confirmReset = await selectYesNo("Jalankan proses project baru?");
    if (!confirmReset) {
      console.log("Mengulangi konfigurasi...\n");
      continue;
    }

    const root = process.cwd();

    const androidPath = path.join(root, "android");
    if (fs.existsSync(androidPath)) {
      try {
        fs.rmSync(androidPath, { recursive: true, force: true });
      } catch (error) {
        console.error("Error menghapus folder android:", error);
      }
    } else {
      console.log("📁 Folder android tidak ditemukan, dilewati.");
    }

    const appJsonPath = path.join(root, "app.json");
    if (fs.existsSync(appJsonPath)) {
      try {
        fs.unlinkSync(appJsonPath);
      } catch (error) {
        console.error("Error menghapus app.json:", error);
      }
    }
    const newAppJson = {
      name: appName.trim(),
      slug: generateSlug(appName),
      version: "1.0.0",
      orientation: "portrait",
      icon: "./src/assets/logo/logo.png",
      scheme: generateScheme(appName),
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      android: {
        adaptiveIcon: {
          foregroundImage: "./src/assets/logo/logo.png",
          backgroundColor: "#ffffff",
        },
        package: packageName.trim(),
      },
      plugins: ["expo-router"],
      experiments: {
        typedRoutes: true,
      },
    };
    try {
      fs.writeFileSync(appJsonPath, JSON.stringify(newAppJson, null, 2));
      console.log("📄 app.json diperbarui.");
    } catch (error) {
      console.error("Error membuat app.json:", error);
    }

    console.log("⏳ Membuat android package...");
    try {
      await new Promise((resolve, reject) => {
        exec(
          "npx expo prebuild --platform android",
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Error saat prebuild: ${error}`);
              return reject(error);
            }
            console.log(stdout);
            resolve();
          }
        );
      });
      console.log("✅ Android package berhasil dibuat.");
    } catch (error) {
      console.error("Prebuild gagal.");
    }

    const gradlePath = path.join(root, "android", "app", "build.gradle");
    if (fs.existsSync(gradlePath)) {
      try {
        let gradleContent = fs.readFileSync(gradlePath, "utf-8");
        const flavorsString = finalFlavors
          .map(
            (flavor) => `        ${flavor} {
            dimension 'default'
            applicationIdSuffix ".${flavor}"
            resValue "string", "build_config_package", "${packageName.trim()}"
        }`
          )
          .join("\n");
        const flavorConfig = `\n    flavorDimensions "default"\n    productFlavors {\n${flavorsString}\n    }\n`;
        const newGradleContent = insertFlavorConfig(
          gradleContent,
          flavorConfig
        );
        fs.writeFileSync(gradlePath, newGradleContent);
        console.log("📝 build.gradle telah diperbarui.");
      } catch (error) {
        console.error("Error memodifikasi build.gradle:", error);
      }
    } else {
      console.log("⚠️ File build.gradle tidak ditemukan.");
    }

    deleteEnvFiles(root);
    const envDefaultPath = path.join(root, ".env");
    try {
      fs.writeFileSync(envDefaultPath, "");
    } catch (error) {
      console.error("Error membuat file .env:", error);
    }
    finalFlavors.forEach((flavor) => {
      const envFlavorPath = path.join(root, `.env.${flavor}`);
      try {
        fs.writeFileSync(envFlavorPath, "");
        console.log(`📄 File .env.${flavor} dibuat.`);
      } catch (error) {
        console.error(`Error membuat file .env.${flavor}:`, error);
      }
    });

    const packageJsonPath = path.join(root, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJsonData = fs.readFileSync(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(packageJsonData);
        packageJson.name = appName.trim();
        const baseScripts = {
          start: "expo start --dev-client",
          ios: "expo run:ios",
          web: "expo start --web",
        };
        if (hasFlavors) {
          baseScripts.android = `set NODE_ENV=development& expo run:android --variant developmentDebug --app-id ${packageName.trim()}.development`;

          userFlavors.forEach((flavor) => {
            baseScripts[
              `${flavor}Development`
            ] = `set NODE_ENV=${flavor}& expo run:android --variant ${flavor}Debug --app-id ${packageName.trim()}.${flavor}`;
            baseScripts[
              `${flavor}Release`
            ] = `set NODE_ENV=${flavor}& expo run:android --variant ${flavor}Release --app-id ${packageName.trim()}.${flavor}`;
          });
        } else {
          baseScripts.android = "expo run:android";
        }
        packageJson.scripts = baseScripts;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("📝 package.json scripts telah diperbarui.");
      } catch (error) {
        console.error("Error memperbarui package.json:", error);
      }
    } else {
      console.log("⚠️ package.json tidak ditemukan.");
    }

    console.log("⏳ Install package...");
    try {
      await new Promise((resolve, reject) => {
        exec("pnpm install", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error saat pnpm install: ${error}`);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        });
      });
    } catch (error) {
      console.error("pnpm install gagal.");
    }

    const scriptsPath = path.join(root, "scripts");
    if (fs.existsSync(scriptsPath)) {
      try {
        fs.rmSync(scriptsPath, { recursive: true, force: true });
      } catch (error) {
        console.error("Error menghapus scripts folder:", error);
      }
    } else {
      console.log("📁 Folder scripts tidak ditemukan, dilewati.");
    }

    console.log("✅ Project baru selesai dibuat.");
    break;
  }
}

createProject();
