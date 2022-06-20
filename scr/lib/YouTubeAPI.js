async function _getPlayList(plId) {
    const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?maxResults=5&part=id,snippet,contentDetails&fields=nextPageToken,prevPageToken,items(id,snippet(title,description,thumbnails(high(url)),publishedAt),contentDetails(videoId))&playlistId=${plId}&key=${YOUTUBE_API_KEY}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }
    let res = await fetch(url, options);
    let resOk = res && res.ok;
    if (resOk) {
        return await res.json();
    }
}
export default _getPlayList;