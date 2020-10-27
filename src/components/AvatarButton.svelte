<script>
  import userIcon from "../icons/user.svg";
</script>

<button class="avatar-btn" type="button">
  <img src={userIcon} alt="user profile" />
</button>

<style>
  .avatar-btn {
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    border-width: 1px;
    border-color: #4299e1;
    border-style: solid;
    padding: 0.75rem;
    overflow: hidden;
    margin: 0.25rem;
  }
</style>
