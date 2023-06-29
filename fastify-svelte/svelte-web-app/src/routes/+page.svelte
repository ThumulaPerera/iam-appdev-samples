<script>
    export let data;
    let items = [];

    let name;
    let id;

    console.log('data: ' + data);

    const target = 'https://2d9ec1f6-2f04-4127-974f-0a3b20e97af5-prod.e1-us-east-azure.choreoapis.dev/rbln/item-service/items-803/1.0.0/items';

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

    async function onAddItem() {
        await addItem();
        name = null;
        id = null;
    }

    function addItem() {
        return fetch(target, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id,
                name
            })
        })
            .then(response => {
                console.log(response);
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
<button on:click={onAddItem}>Add Item</button>
<a href="/logout">
    <button>Logout</button>
</a>
{:else}
<a href="/login">
    <button>Login</button>
</a>
{/if}