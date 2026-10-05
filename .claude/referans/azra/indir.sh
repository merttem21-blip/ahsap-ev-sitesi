#!/bin/bash
cd "$(dirname "$0")"
while read -r slug url; do

  [ -s "sayfalar/$slug.html" ] && continue
  code=$(curl -s -L -A "Mozilla/5.0 (2K AHSAP icerik tasima)" -o "sayfalar/$slug.html" -w "%{http_code}" "$url")
  echo "$code $slug $(stat -c %s sayfalar/$slug.html)"
  sleep 1.5
done < indirilecek.txt
echo BITTI
