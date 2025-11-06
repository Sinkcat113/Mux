<script lang="ts">
    import Logo from "$lib/assets/Mux_Logo_Extended.png"
</script>

<div class="wrapper">
    <div class="logo-wrapper">
        <img class="logo" src={Logo} alt="">
    </div>
    <div class="login-form">
        <h3>Sign In</h3>
        <form class="login" action="/login" method="POST">
            <div>
                <input type="text" placeholder="Username" name="username">
            </div>
            <div>
                <input type="password" placeholder="Password" name="password">
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>


<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .login-form {
        width: 300px;
        padding: 20px;
        border-radius: 12px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        gap: 20px;
        flex-direction: column;
        background-color: rgb(31, 31, 31);
        border-style: solid;
        border-width: 0.5px;
        border-color: rgba(128, 128, 128, 0.267);
    }

    .login {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .logo {
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }

    h3 {
        font-size: 0.9rem;
        margin: 0;
        font-family: sans-serif;
        color: white;
        text-align: center;
    }

    input {
        width: 92%;
        background-color: rgb(25, 25, 25);
        border-style: solid;
        border-width: 0.5px;
        border-color: rgba(128, 128, 128, 0.356);
        color: white;
        padding: 12px;
        border-radius: 12px;
        outline: none;
        transition: 0.06s;
        border: none;
    }

    input:focus {
        background-color: rgb(49, 49, 49);
    }

    button {
        text-align: center;
        width: 100%;
        border: none;
        border-radius: 12px;
        padding: 12px;
        font-weight: 800;
        font-family: sans-serif;
        cursor: pointer;
        transition: 0.12s;
    }

    button:hover {
        background-color: rgb(216, 216, 216);
    }

    button:active {
        scale: 95%;
    }
</style>