<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import ThisWeek from '../components/ThisWeek.svelte';

  let tracker = [];
  const dayNumber = dayjs().day();
  const startOfWeekDate = dayjs()
    .subtract(dayNumber, 'day')
    .format('YYYY-MM-DDT00:00:00Z');

  onMount(async () => {
    const res = await fetch(`api/tracker/1.json`); //1 to be replaced with current user
    const data = await res.json();
    tracker = data.message;
  });

  async function refreshData() {
    try {
      const res = await fetch(`api/tracker/1.json`);
      const data = await res.json();
      tracker = data.message;
    } catch {
      //update error toast
      console.error('update failed');
    }
  }

  function handleMessage(event) {
    console.log(event.detail);
    if (event.detail.update === 'new item') {
      refreshData();
    }
  }
  $: thisWeek = tracker.filter((activity) =>
    dayjs(activity.added).isAfter(startOfWeekDate)
  );
</script>

<style>

</style>

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
