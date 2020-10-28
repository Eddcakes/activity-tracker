<script>
  export let text;
  export let handleClick;
  export let todayNumber;
  export let index;
  export let current;

  const logger = () => {
    console.log(
      `index: ${index}, todayNumber: ${todayNumber}, current: ${current}`
    );
  };
</script>

<button
  id={`date-btn${index}`}
  class:today={index === todayNumber}
  class:selected={index === current}
  on:click={handleClick}>
  {text}
</button>

<style>
  button {
    min-width: 48px;
    min-height: 48px;
    width: 10vw;
    height: 10vw;
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    border-width: 2px;
    border-color: #ff5b05; /* #ff3e00 */
    border-style: solid;
    /* padding: 0.75rem; */
    overflow: hidden;

    text-transform: uppercase;
    line-height: 1.1em;
    font-size: 1em;
    word-spacing: 5em;
  }

  button:hover {
    background-color: #ffc394;
  }

  button:focus {
    outline: none;
    border-color: #df4a06;
    background-color: #ffc394;
  }

  button:active {
    background-color: #ffa466;
  }

  .today {
    font-weight: 700;
  }

  .selected {
    background-color: #ffdcbd;
  }
</style>
