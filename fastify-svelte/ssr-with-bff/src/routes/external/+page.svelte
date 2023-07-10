<script>
    import { env } from '$env/dynamic/public';

    let target = env.PUBLIC_ITEM_SERVICE_URL;

    export let data;

    let items = data.items;
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
<br>
<br>

<form method="POST">
    <label>
        Item ID:
        <input name="id">
    </label>
    <label>
        Item name:
        <input name="item">
    </label>
    <input hidden name="token" value={data.tokens.access_token}>
    <button>Add Item</button>
</form>

<br>
<br>
<a href="/">
    <button>Home</button>
</a>
