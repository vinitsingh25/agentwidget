document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  const container = document.querySelector('.movie-info');
  const sendButton = document.getElementById('sendButton');

  const renderMovie = async (mName) => {
    let uri = 'https://www.omdbapi.com/?apikey=adad0835&t=';

    if (mName) {
      uri += mName;
    }

    try {
      const res = await axios.get(uri);
      const movies = res.data;

      document.getElementById('title').textContent = movies.Title;
      document.getElementById('released').textContent = movies.Released;
      document.getElementById('director').textContent = movies.Director;

      const notificationHandler = function(data) {
        // Do something with the notifications
      };

      const focusHandler = function() {
        // Do something when the visitor is focused
        // Assume the visitor is focused to begin with
      };

      const blurHandler = function() {
        // Do something when the visitor is blurred
        // Assume the visitor is focused to begin with
      };

      lpTag.agentSDK.init({
        notificationCallback: notificationHandler,
        visitorFocusedCallback: focusHandler,
        visitorBlurredCallback: blurHandler
      });

      const notifyWhenDone = function(err) {
        if (err) {
          console.log("Error Occurred in notifyWhenDone: " + err);
        }
      };

      const commandData = { text: `Title: ${movies.Title}, Released: ${movies.Released}, Director: ${movies.Director}` };

      lpTag.agentSDK.command(lpTag.agentSDK.cmdNames.write, commandData, notifyWhenDone);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mName = searchForm.elements.search.value.trim();
    renderMovie(mName);
  });

  sendButton.addEventListener('click', function() {
    const mName = searchForm.elements.search.value.trim();
    renderMovie(mName);
  });
});
