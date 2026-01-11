# Neobrutalism Portfolio

Neobrutalism estetikle tasarlanmis, Vite + React tabanli kisisel portfolio.
Projeler statik JSON dosyalariyla yonetilir ve GitHub repo bilgisi olan
projeler icin techstack yuzdeleri build oncesi otomatik guncellenir.

## Ozellikler
- Neobrutalism arayuz, responsive sayfa yapisi
- JSON tabanli proje yonetimi (`src/projelerim/*.json`)
- GitHub Languages API ile techstack yuzdeleri
- Vercel uyumlu build akisi

## Kurulum
```
npm install
npm run dev
```

## Proje Verisi
Her proje icin `src/projelerim/` altina bir JSON dosyasi eklenir.

Ornek:
```json
{
  "id": "ornek-proje",
  "category": "web",
  "title": "Ornek Portfolio",
  "description": "Kisa aciklama",
  "techstacks": ["Vite", "React", "Tailwind"],
  "link": "https://example.com",
  "githubLink": "https://github.com/kullanici/repo",
  "date": "2024-12-01"
}
```

- `githubLink` varsa build oncesi techstack yuzdeleri guncellenir.
- `date` siralama icin kullanilir (yeni olan ustte).

## GitHub Techstack Guncelleme
```
npm run update:github-techstacks
```

Rate limit problemi olmamasi icin:
```
GITHUB_TOKEN=... npm run update:github-techstacks
```

## Build
```
npm run build
```

Build oncesi `prebuild` otomatik calisir ve GitHub techstackleri gunceller.

## Vercel
- Environment Variables icine `GITHUB_TOKEN` ekle.
- Deploy yeniden tetikle.

## Gelistirme Scriptleri
- `npm run dev` development server
- `npm run build` production build
- `npm run preview` production preview
- `npm run update:github-techstacks` techstack guncelleme
