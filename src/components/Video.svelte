<script>
  import VideoPlayer from "svelte-video-player";
  export let source = ["/rumour_context.webm", "/rumour_context.mp4"];
</script>

<VideoPlayer {source} />
