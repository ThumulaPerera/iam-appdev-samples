<script>
    export let data;

    function rerun() {
        fetch('/items', {
            method: 'POST'
        });
    }
</script>

<p>Welcome</p>

{#if data.token}
<p>Access token: {data.token}</p>
<a href="/items">
    <button>Get Items</button>
</a>
<!-- TODO convert this to a form post -->
<button on:click={rerun}>Add Item</button>
<a href="/logout">
    <button>Logout</button>
</a>
{:else}
<a href="/login">
    <button>Login</button>
</a>
{/if}