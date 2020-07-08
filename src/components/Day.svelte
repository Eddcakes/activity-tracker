<script>
  import { onMount, createEventDispatcher } from "svelte";
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
      const res = await fetch("api/activity");
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
  //how svelte doesnt seem to update the control, what am i doing wrong here
  async function handleAdd() {
    posting = true;
    console.log(`reps: ${reps}, selected: ${selectedActivity}`);
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
</script>

<div>
  {dayjs(date).format('DD/MM/YYYY')} - Total: {total}
  <div>
    {#if todaysActivities.length > 0}
      {#each todaysActivities as activity, index}
        <div>
          {index + 1} | {activity.quantity} {activity.label}s {dayjs(activity.added).format('h:mm:ss A')}
        </div>
      {/each}
    {:else}
      <div>No activities 👟</div>
    {/if}
  </div>
  {#if isToday}
    <div class="update-activity-bar {posting ? 'disabled' : ''}">
      <input inputmode="decimal" min="1" bind:value={reps} />
      <select bind:value={selectedActivity}>
        {#each activities as activity (activity.id)}
          <option value={activity.id}>{activity.label}</option>
        {/each}
      </select>
      <button on:click={handleAdd} disabled={posting}>add</button>
    </div>
  {/if}
</div>

<style>
  .update-activity-bar {
    display: flex;
    justify-content: space-between;
    height: 4em;
    border: 2px solid green;
    border-radius: 50px;
  }

  .update-activity-bar.disabled {
    background-color: grey;
  }
  /* hmm why didnt flex grow work nicely */
  .update-activity-bar input {
    width: 20%;
    font-size: 1.5em;
    border: 0;
    border-radius: 50px 0 0 50px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 0.3em;
    background-color: greenyellow;
  }

  .update-activity-bar select {
    width: 50%;
    font-size: 1.5em;
    border: 0;
    background-color: greenyellow;
    text-transform: capitalize;
  }

  .update-activity-bar button {
    width: 30%;
    font-size: 1.5em;
    border-radius: 0 50px 50px 0;
  }

  button {
    text-transform: uppercase;
  }
</style>
