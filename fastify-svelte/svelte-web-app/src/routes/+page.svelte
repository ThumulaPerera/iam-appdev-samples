<script>
    import { env } from '$env/dynamic/public';

    export let data;
    let items = [];

    let name;
    let id;

    const target = env.PUBLIC_ITEMS_ENDPOINT;

    async function onGetItems() {
        items = await getItems();
    }

    function getItems() {
        return fetch(target, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
        })
    }

    function onClearList() {
        items = [];
    }

</script>

<p>Welcome</p>

{#if data.token}
<button on:click={onGetItems}>Get Items</button>

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
<button on:click={onClearList}>Clear List</button>
{/if}

<br>
<br>

<!-- TODO convert this to a form post -->
<input placeholder="Item ID" bind:value={id}>
<input placeholder="Item Name" bind:value={name}>
<a href="/items?id={id}&name={name}">
    <button>Add Item</button>
</a>
<a href="/logout">
    <button>Logout</button>
</a>
{:else}
<a href="/login">
    <button>Login</button>
</a>
{/if}