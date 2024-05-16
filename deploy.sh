#!/bin/bash
 directory="/usr/share/nginx/html/assets"

 # 디렉터리가 존재하는지 확인
 if [ -d "$directory" ]; then
     echo "디렉터리가 존재합니다. 삭제를 진행합니다."
     sudo rm -r "$directory"
 else
     echo "디렉터리가 존재하지 않습니다. 아무 작업도 수행하지 않습니다."
 fi
 sudo mv -f /home/ubuntu/deploy_front/favicon.ico /usr/share/nginx/html/
 sudo mv -f /home/ubuntu/deploy_front/index.html /usr/share/nginx/html/
 sudo mv -f /home/ubuntu/deploy_front/assets /usr/share/nginx/html/

 # end of the script