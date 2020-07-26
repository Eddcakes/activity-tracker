<script>
  export let items;
  // export let groupForItem = (item) => "Group name";
  export let groupForItem = function (item) {
    return "Group name";
  };
  let groupedItems = null;

  $: if (items) {
    groupedItems = groupAll(items);
  }

  function groupAll(items) {
    let groupedItems = [];
    let lastGroup = null;
    let group = null;

    items.forEach((item) => {
      const itemGroup = groupForItem(item);
      if (lastGroup === null || lastGroup != itemGroup) {
        lastGroup = itemGroup;
        group = {
          group: itemGroup,
          items: [],
        };
        groupedItems.push(group);
      }
      group.items.push(item);
    });
    return groupedItems;
  }
</script>

<!-- https://pace.dev/blog/2020/02/01/grouper-component-for-svelte-by-mat-ryer.html -->
{#each groupedItems as groupedItem}
  <slot name="group" group={groupedItem.group} />
  <table>
    {#each groupedItem.items as item}
      <slot name="item" {item} />
    {/each}
  </table>
{/each}

<style>
  table {
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top: none;
    border-collapse: collapse;
    margin-bottom: 1em;
    counter-reset: rowNumber;
  }
</style>
