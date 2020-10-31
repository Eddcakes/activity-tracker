<script>
  import { onMount, createEventDispatcher } from "svelte";

  let reps = 10; //load from local storage?/save to
  let selectedActivity = 1;
  let activities = []; //initially get from cookies?
  let posting = false; //if true disable button

  const dispatch = createEventDispatcher();

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
      const posted = postActivity;
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
</script>

<div class="activity-bar-container">
  <div class="activity-bar {posting ? 'disabled' : ''}">
    <div>
      <input
        class="activity-bar-focus"
        inputmode="decimal"
        min="1"
        bind:value={reps} />
    </div>
    <div>
      <select class="activity-bar-focus" bind:value={selectedActivity}>
        {#each activities as activity (activity.id)}
          <option value={activity.id}>{activity.label}</option>
        {/each}
      </select>
    </div>
    <div>
      <button
        class="activity-bar-focus"
        on:click={handleAdd}
        disabled={posting}>
        add
      </button>
    </div>
  </div>
</div>

<style>
  .activity-bar-container {
    position: fixed;
    left: 0;
    bottom: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .activity-bar {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    height: 4em;
    border: 2px solid #ff5b05;
    border-radius: 50px;
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    width: 70%;
  }

  .activity-bar.disabled {
    background-color: grey;
  }

  input {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    border: 0;
    border-radius: 50px 0 0 50px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 0.3em;
    background-color: #ffecdb;
  }

  select {
    width: 100%;
    height: 100%;
    background-color: #ffecdb;
    text-transform: capitalize;
    font-size: 1.5em;
    border: 0;
  }

  button {
    width: 100%;
    height: 100%;
    font-size: 1.5em;
    border-radius: 0 50px 50px 0;
    background-color: #ffecdb;
    text-transform: uppercase;
  }

  button:hover {
    background-color: #ffc394;
  }

  .activity-bar-focus:focus {
    outline: none;
    background-color: #ffc394;
    box-shadow: 0 0 0 3px rgba(223, 74, 6, 0.5) !important;
  }

  button:active {
    background-color: #ffa466;
  }
</style>
