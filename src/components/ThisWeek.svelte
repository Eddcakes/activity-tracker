<script>
  import Day from "./Day.svelte";
  import dayjs from "dayjs";
  export let data;
  export let selected;
  export let todayNumber;

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const onClick = (evt) => (selected = evt.target.value);

  $: date = () => {
    //work out the date to pass to date component
    //can we do somethign with todayNumber and selected
    if (todayNumber === selected) {
      return dayjs();
    } else if (todayNumber < selected) {
      return dayjs().add(selected - todayNumber, "day");
    } else {
      return dayjs().subtract(todayNumber - selected, "day");
    }
  };
  $: todaysData = data.filter((activity) =>
    dayjs(activity.added).isSame(dayjs(date()), "day")
  );
</script>

<div>
  <ul>
    {#each days as day, index}
      <li
        class:today={index === todayNumber}
        class:selected={index === selected}
        on:click={onClick}
        value={index}>
        {index === todayNumber ? `${dayjs().format('DD')} ${day}` : `${dayjs()
              .add(index - todayNumber, 'day')
              .format('DD')} ${day}`}
      </li>
    {/each}
  </ul>
  <Day
    isToday={todayNumber === selected}
    todaysActivities={todaysData}
    date={date()}
    on:message />
</div>

<style>
  div {
    text-align: center;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    user-select: none;
  }

  li {
    margin: 0;
    text-transform: uppercase;
    width: 3em;
    height: 3em;
    line-height: 1.1em;
    border: solid 1px transparent;
    font-size: 1em;
    word-spacing: 5em;
  }

  li:hover {
    cursor: pointer;
  }

  .today {
    font-weight: 700;
  }
  /* could we add a sliding animation for the highlight */
  .selected {
    background-color: aliceblue;
    border: solid 1px aquamarine;
    border-radius: 100%;
  }
</style>
