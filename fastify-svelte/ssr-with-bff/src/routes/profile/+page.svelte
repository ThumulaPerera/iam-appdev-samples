<script>
    export let data;

    let tokens = data.tokens;
    let user = data.user;
</script>

<h1>User Profile</h1>

<p>email : {user?.email}</p>
<p>userid : {user?.id}</p>

<a href="/">
    <button>Home</button>
</a>