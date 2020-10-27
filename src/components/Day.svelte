<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Grouper from "./Grouper.svelte";
  import dayjs from "dayjs";
  export let isToday;
  export let todaysActivities;
  export let date;

  let reps = 10; //load from local storage?/save to
  let selectedActivity = 1;
  let activities = []; //initially get from cookies?
  let posting = false; //if true disable button

  const dispatch = createEventDispatcher();

  onMount(async () => {
    try {
      const res = await fetch("api/activity.json");
      const data = await res.json();
      activities = data.message;
    } catch {
      console.error("could not mount activities");
      activities = [];
    }
  });

  $: total = todaysActivities.reduce(
    (acc, current) => (acc += current.quantity),
    0
  );

  async function handleAdd() {
    posting = true;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: reps,
        activityId: selectedActivity,
        userId: 1, //need to get current user
      }),
    };
    try {
      const postActivity = await fetch("api/tracker.json", settings);
      const posted = await postActivity;
      if (posted.ok) {
        dbUpdate();
        posting = false;
        return posted;
      } else {
        posting = false;
      }
    } catch (err) {
      console.error(err);
      posting = false;
    }
    /*setTimeout(() => {
      console.log('button should be disabled');
    }, 2000); */
  }

  function dbUpdate() {
    dispatch("message", {
      update: "new item",
    });
  }

  function groupForItem(item) {
    return item.label;
  }
</script>

{#if todaysActivities.length > 0}
  <Grouper items={todaysActivities} {groupForItem} let:group let:item>
    <div slot="group">
      <div class="caption">
        <div>{dayjs(date).format('DD/MM/YYYY')}</div>
        <div>{group}s</div>
        <div>Total: {total}</div>
      </div>
    </div>
    <tr slot="item" class="count">
      <td>{item.quantity}</td>
      <td>{item.label}</td>
      <td>{dayjs(item.added).format('h:mm:ss A')}</td>
    </tr>
  </Grouper>
{:else}
  <div>No activities 👟</div>
{/if}
<div>

  {#if isToday}
    <div class="update-activity-bar {posting ? 'disabled' : ''}">
      <div class="input">
        <input inputmode="decimal" min="1" bind:value={reps} />
      </div>
      <div class="select">
        <select bind:value={selectedActivity}>
          {#each activities as activity (activity.id)}
            <option value={activity.id}>{activity.label}</option>
          {/each}
        </select>
      </div>
      <div class="button">
        <button on:click={handleAdd} disabled={posting}>add</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .update-activity-bar {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    height: 4em;
    border: 2px solid green;
    border-radius: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .update-activity-bar.disabled {
    background-color: grey;
  }

  .input input {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    border: 0;
    border-radius: 50px 0 0 50px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 0.3em;
    background-color: greenyellow;
  }

  .select select {
    width: 100%;
    height: 100%;
    background-color: greenyellow;
    text-transform: capitalize;
    font-size: 1.5em;
    border: 0;
  }

  .button button {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    border-radius: 0 50px 50px 0;
  }

  .caption {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    padding: 1em;
    border-radius: 0.25em;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    margin: auto;
    max-width: 50%;
  }

  .caption:hover {
    background-color: #a0a0a0;
    cursor: pointer;
  }

  button {
    text-transform: uppercase;
  }

  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* Grouper component has rowNumber counter reset */
  tr::before {
    display: table-cell;
    counter-increment: rowNumber;
    content: counter(rowNumber);
    padding-right: 1em;
    padding-left: 1em;
  }

  td {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
