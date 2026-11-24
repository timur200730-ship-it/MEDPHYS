MEDPHYS — ИНСТРУКЦИЯ ПО УСТАНОВКЕ

В архиве есть папка docs. ВАЖНО: загрузить нужно СОДЕРЖИМОЕ этой папки в папку docs репозитория GitHub, а не сам ZIP.

1. Распакуйте архив.
2. Откройте репозиторий MEDPHYS на GitHub.
3. Откройте папку docs.
4. Add file → Upload files.
5. Откройте папку docs из распакованного архива и перетащите ВСЕ файлы из неё в GitHub.
6. Commit changes.
7. Settings → Pages → Deploy from a branch → main → /docs → Save.

Папка docs должна содержать:
.nojekyll
index.html
styles.css
app.js
manifest.webmanifest
sw.js
favicon.svg

Файлы React/Vite в корне репозитория пока не удаляйте. Этот прототип — отдельная статическая публикация для проверки концепции.
