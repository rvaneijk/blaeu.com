ffmpeg -i gettyimages-1368070487.mp4 \
  -c:v libx264 -profile:v baseline -level 3.0 -x264opts "keyint=60:min-keyint=60:no-scenecut" \
  -filter_complex "[0:v]split=3[v1][v2][v3]; \
                   [v1]scale=w=640:h=360:force_original_aspect_ratio=decrease[v1out]; \
                   [v2]scale=w=480:h=270:force_original_aspect_ratio=decrease[v2out]; \
                   [v3]scale=w=320:h=180:force_original_aspect_ratio=decrease[v3out]" \
  -map "[v1out]" -b:v:0 800k -maxrate:v:0 856k -bufsize:v:0 1200k \
  -map "[v2out]" -b:v:1 400k -maxrate:v:1 456k -bufsize:v:1 700k \
  -map "[v3out]" -b:v:2 200k -maxrate:v:2 256k -bufsize:v:2 400k \
  -f dash \
  -use_timeline 1 \
  -use_template 1 \
  -window_size 4 \
  -adaptation_sets "id=0,streams=0,1,2" \
  -hls_playlist 1 \
  -seg_duration 4 \
  adaptive.mpd