<script>
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import ThisWeek from "../components/ThisWeek.svelte";

  const debug = null; //"debug";
  const testData = [
    {
      id: 1,
      quantity: 10,
      added: dayjs().add(-4, "h").format("YYYY-MM-DDTHH:mm:ssZ"),
      activity_id: 1,
      user_id: 1,
      label: "push-up",
      unit: "rep",
    },
    {
      id: 2,
      quantity: 10,
      added: dayjs().add(-3, "h").format("YYYY-MM-DDTHH:mm:ssZ"),
      activity_id: 3,
      user_id: 1,
      label: "sit-up",
      unit: "rep",
    },
    {
      id: 3,
      quantity: 10,
      added: dayjs().add(-2, "h").format("YYYY-MM-DDTHH:mm:ssZ"),
      activity_id: 2,
      user_id: 1,
      label: "curl",
      unit: "rep",
    },
    {
      id: 4,
      quantity: 10,
      added: dayjs().add(-1, "h").format("YYYY-MM-DDTHH:mm:ssZ"),
      activity_id: 1,
      user_id: 1,
      label: "push-up",
      unit: "rep",
    },
  ];

  let tracker = [];
  const dayNumber = dayjs().day();
  const startOfWeekDate = dayjs()
    .subtract(dayNumber, "day")
    .format("YYYY-MM-DDT00:00:00Z");

  onMount(async () => {
    if (debug === "debug") {
      tracker = testData;
    } else {
      const res = await fetch(`api/tracker/1.json`); //1 to be replaced with current user
      const data = await res.json();
      tracker = data.message;
    }
  });
  async function refreshData() {
    try {
      const res = await fetch(`api/tracker/1.json`);
      const data = await res.json();
      tracker = data.message;
    } catch {
      //update error toast
      console.error("update failed");
    }
  }

  function handleMessage(event) {
    console.log(event.detail);
    if (event.detail.update === "new item") {
      refreshData();
    }
  }
  $: thisWeek = tracker.filter((activity) =>
    dayjs(activity.added).isAfter(startOfWeekDate)
  );

  //$: console.log(tracker);
</script>

<svelte:head>
  <title>Tracker</title>
</svelte:head>

<main>
  <ThisWeek
    selected={dayNumber}
    data={thisWeek}
    todayNumber={dayNumber}
    on:message={handleMessage} />
</main>

<style>

</style>
