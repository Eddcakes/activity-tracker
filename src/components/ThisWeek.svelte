<script>
  import Day from "./Day.svelte";
  import dayjs from "dayjs";
  import DateButton from "./DateButton.svelte";
  export let data;
  export let selected;
  export let todayNumber;

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const onClick = (evt) => {
    selected = getValue(evt.target.id);
  };
  function getValue(id) {
    const value = id.split("date-btn")[1];
    return parseInt(value, 10);
  }

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

<div class="container">
  <div class="day-bar">
    <ul>
      {#each days as day, index}
        <li>
          <DateButton
            handleClick={onClick}
            {todayNumber}
            {index}
            current={selected}
            text={index === todayNumber ? `${dayjs().format('DD')} ${day}` : `${dayjs()
                  .add(index - todayNumber, 'day')
                  .format('DD')} ${day}`} />
        </li>
      {/each}
    </ul>
  </div>

  <Day
    isToday={todayNumber === selected}
    todaysActivities={todaysData}
    date={date()}
    on:message />
</div>

<style>
  .container {
    text-align: center;
  }

  .day-bar {
    display: flex;
    overflow-x: hidden;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  /* mfw galaxy fold */
  li {
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }
  @media screen and (min-width: 320px) {
    li {
      margin-right: 0.4rem;
      margin-left: 0.4rem;
    }
  }
  @media screen and (min-width: 500px) {
    ul {
      flex-wrap: none;
      justify-content: space-between;
    }

    li {
      margin: 0;
    }
  }
</style>
