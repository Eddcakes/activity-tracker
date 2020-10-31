<script>
  import dayjs from "dayjs";

  import Grouper from "./Grouper.svelte";
  import ActivityBar from "./ActivityBar.svelte";

  export let isToday;
  export let todaysActivities;
  export let date;

  function groupForItem(item) {
    return item.label;
  }
</script>

<div class="daily-activities">
  {#if todaysActivities.length > 0}
    <Grouper
      items={todaysActivities}
      {groupForItem}
      let:group
      let:total
      let:item
      let:index>
      <caption slot="group">
        <span>{dayjs(date).format('DD/MM/YYYY')}</span>
        <span>{group}s</span>
        <span>Total: {total}</span>
      </caption>
      <tr slot="item" class="count">
        <td>{index + 1}</td>
        <td>{item.quantity}</td>
        <td>{item.label}</td>
        <td>{dayjs(item.added).format('h:mm:ss A')}</td>
      </tr>
    </Grouper>
  {:else}
    <div>No activities 👟</div>
  {/if}

  {#if isToday}
    <ActivityBar on:message />
    <div class="scroll-helper" />
  {/if}
</div>

<style>
  .daily-activities {
    padding-top: 2rem;
  }

  caption {
    font-weight: 600;
    padding: 1em;
    border-radius: 0.25em;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  caption:hover {
    background-color: #ffc394;
    cursor: pointer;
  }

  .scroll-helper {
    height: 25vh;
  }

  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  td {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
