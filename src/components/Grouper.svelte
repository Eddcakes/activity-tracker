<script>
  export let items;
  export let groupForItem = () => "Group name"; //default value
  let groupedItems = null;

  $: if (items) {
    groupedItems = groupAll(items);
  }

  function groupAll(items) {
    let groupedItems = [];
    let lastGroup = null;
    let group = null;
    //let existingGroups = [];

    //doesnt quite work how i want, only groups if last item - i want to group all items of same category

    items.forEach((item) => {
      const itemGroup = groupForItem(item); //returns items label (group)
      /*creates new group when last group is null
        or last group is different group
      */

      if (lastGroup === null || lastGroup != itemGroup) {
        lastGroup = itemGroup;
        group = {
          group: itemGroup,
          items: [],
        };
        groupedItems.push(group);
      }
      group.items.push(item);

      /*  wip need to change grouper functionality
      if (lastGroup === null || !existingGroups.includes(itemGroup)) {
        lastGroup = itemGroup;
        existingGroups.push(itemGroup);
        group = {
          group: itemGroup,
          items: [],
        };
        groupedItems.push(group);
      }
      group.items.push(item); */
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
