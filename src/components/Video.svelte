<script>
  import { Player, Video, DefaultUi } from "@vime/svelte";
</script>

<Player theme="dark" loop=false >
  <Video crossOrigin>
    <source src='/rumour_context.webm' type='video/webm' />
    <source src='/rumour_context.mp4' type='video/mp4' /> 

    <track
      default
      kind="subtitles"
      src="/rumour_context.vtt"
      srclang="en"
      label="English" />
  </Video>
  <DefaultUi />
</Player>
