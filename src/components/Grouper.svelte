<script>
  export let items;
  export let groupForItem = () => "Group name"; //default value
  let groupedItems = null;

  const byActivity = (a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  };

  $: sortedItems = items.sort(byActivity);

  $: if (items) {
    groupedItems = groupAll(sortedItems);
  }

  function groupAll(items) {
    let groupedItems = [];
    let lastGroup = null;
    let group = null;

    items.forEach((item) => {
      const itemGroup = groupForItem(item); //returns items label (group)
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
    // set total
    groupedItems.forEach((group) => {
      group.total = group.items.reduce(
        (acc, current) => (acc += current.quantity),
        0
      );
    });
    return groupedItems;
  }
</script>

<!-- https://github.com/sveltejs/svelte/issues/4546 // add never added blank slot to prevent warning-->
{#if false}
  <slot />
{/if}

<!-- https://pace.dev/blog/2020/02/01/grouper-component-for-svelte-by-mat-ryer.html -->
{#each groupedItems as groupedItem}
  <table style="margin: auto;">
    <slot name="group" group={groupedItem.group} total={groupedItem.total} />
    {#each groupedItem.items as item, index (item.added)}
      <slot name="item" {item} {index} />
    {/each}
  </table>
{/each}

<!--
  had to resort to style tag because for somereason styles added to this table doesnt apply
  from class or table {} in style tags
  the class is applied but have no styles... 😢
-->
