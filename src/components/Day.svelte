<script>
  import dayjs from "dayjs";

  import Grouper from "./Grouper.svelte";
  import ActivityBar from "./ActivityBar.svelte";

  export let isToday;
  export let todaysActivities;
  export let date;

  $: total = todaysActivities.reduce(
    (acc, current) => (acc += current.quantity),
    0
  );

  function groupForItem(item) {
    return item.label;
  }
</script>

<div class="daily-activities">
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

  {#if isToday}
    <ActivityBar />
    <div class="scroll-helper" />
  {/if}
</div>

<style>
  .daily-activities {
    padding-top: 2rem;
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
    background-color: #ffc394;
    cursor: pointer;
  }

  .scroll-helper {
    height: 25vh;
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
