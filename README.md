## Kebutuhan

**Node:** >=18.20.7

**Package Manager:** PNPM

**JDK:** >=11

*note : pastikan environment `JAVA_HOME` menggunakan minimal `JDK versi 11`

## Instalasi

```bash
  git clone https://github.com/afrinaldi-knitto/base-rn-expo.git
```

```bash
  cd base-rn-expo
```

```bash
  pnpm install
```

tambahkan file `local.properties` pada folder` android/` lalu set lokasi sdk (sesuaikan lokasinya) contoh:

```bash
  sdk.dir=C\:\\Users\\{nama}\\AppData\\Local\\Android\\Sdk
```

atau

Buka android studio dan arahkan pada folder `android/` maka otomatis `local.properties` akan tergenerate.

*note : jika dibuka dengan `android studio` biasanya `JDK` akan otomatis di set, maka pastikan menggunakan minimal versi 11. cek pada `settings` > `Build, Execution, Deployment` > `Build tools` > `Gradle` > `Gradle JDK`

## Jalankan & Buat APK

```bash
  pnpm android
```

## Buat Project Baru

```bash
  pnpm install
```

```bash
  pnpm new-project
```

tambahkan file `local.properties` pada folder` android/` lalu set lokasi sdk (sesuaikan lokasinya) contoh:

```bash
  sdk.dir=C\:\\Users\\{nama}\\AppData\\Local\\Android\\Sdk
```

sesuaikan konfigurasi `.env` dengan `EXPO_PUBLIC_{nama}` agar dapat di konsumsi langsung dengan `process.env.EXPO_PUBLIC_{nama}` contoh:

```bash
  EXPO_PUBLIC_BASE_URL=https://jsonplaceholder.typicode.com/
  EXPO_PUBLIC_NAME=Default
```

lalu jalankan program dengan

```bash
  pnpm android
```
