#!/bin/bash
cd "$(dirname "$0")"
while read -r id url; do
  ext="${url##*.}"
  [ -s "kucuk/$id.$ext" ] && continue
  code=$(curl -s -A "Mozilla/5.0 (2K AHSAP icerik tasima)" -o "kucuk/$id.$ext" -w "%{http_code}" "$url")
  [ "$code" != "200" ] && echo "HATA $code $id $url"
  sleep 1
done < kucuk-liste.txt
echo BITTI
