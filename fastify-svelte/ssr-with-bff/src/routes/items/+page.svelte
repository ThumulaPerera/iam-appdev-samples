<script>
    export let data;

    let user = data.user;
    let items = data.items;

    let userId = user?.id;

    async function getItems() {
        const res = await fetch(`/api/items?user=${userId}`);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();
    }

    async function onGetItems() {
        items = await getItems();
    }

</script>

<h1>Items</h1>

{#if items[0]}
<table>
    <tr>
        <th>ID</th>
        <th>name</th>
    </tr>
    {#each items as item}
    <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
    </tr>
    {/each}
</table>
{/if}

<br>

<button on:click={onGetItems}>Refresh List</button>

<br>
<br>
<br>

<form method="POST">
    <label>
        Item name:
        <input name="item">
    </label>
    <input hidden name="user-id" value={userId}>
    <button>Add Item</button>
</form>

<br>
<br>
<a href="/">
    <button>Home</button>
</a>
