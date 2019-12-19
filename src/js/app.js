function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}

const input = document.getElementById('postSearch')
const myHandler = (event) => {
  if (!event) return;
  const { value } = event.target;
  fetch(`/posts-partial?q=${value}`)
    .then(res => res.text()).then(res => {
      const postsContainer = document.getElementById('posts');
      postsContainer.innerHTML = res;
    });
}
const dHandler = debounced(200, myHandler);
if (input) {
  input.addEventListener("input", dHandler);
}
