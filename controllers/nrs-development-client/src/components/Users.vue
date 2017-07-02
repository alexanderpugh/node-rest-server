<template>
  <div class="container">

    <section class="row">
      <h2>Users</h2>
      <div class="table-responsive">
        <table class="table table-striped table-hover" v-if="users">
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>IS ADMIN</th>
              <th>ID</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <td>{{ user.username }}</td>
              <td>{{ user.password }}</td>
              <td>{{ user.isAdmin }}</td>
              <td>{{ user._id }}</td>
              <td>
                <button class="btn btn-danger" v-on:click="deleteUser(user)">DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="tempUser" class="row">
      <h2>Add new User</h2>
      <div class="col col-sm-3">
        <input class="form-control" type="text" v-model="tempUser.username" placeholder="Username">
      </div>
      <div class="col col-sm-3">
        <input class="form-control" type="text" v-model="tempUser.password" placeholder="Password">
      </div>
      <div class="col col-sm-3">
        <div class="checkbox">
          <label>
            <input v-model="tempUser.isAdmin" type="checkbox"> Is Admin
          </label>
        </div>
      </div>
       <div class="col col-sm-3">
        <button :disabled="savingNewUser" v-on:click="saveNewUser" class="btn btn-info">SAVE</button>
        <button class="btn btn-warning" v-on:click="getTempUser">CLEAR</button>
      </div>
    </section>
  </div>
</template>

<script>
  import Users from '@/models/users.model';

  export default {
    name: 'users',
    
    data () {
      return {
        users: null,
        tempUser: null,
        savingNewUser: false,
        deletingUser: false
      }
    },

    methods: {
      getTempUser () {
        this.tempUser = Users.generateTempUser();
      },

      saveNewUser () {
        this.savingNewUser = true;
        (async () => {
          const userSaved = await Users.addUser(this.tempUser);
          
          if (userSaved) {
            this.savingNewUser = false;
            this.getTempUser();
            this.loadUsers();
          }
        })();
      },

      loadUsers () {
        (async () => {
          this.users = await Users.getUsers();
        })();
      },

      deleteUser (user) {
        if(this.deletingUser) {
          return;
        }

        this.deletingUser = true;

        (async () => {
          const userDeleted = await Users.deleteUser(user);
          if (userDeleted) {
            this.loadUsers();
            this.deletingUser = false;
          }
        })();
      }
    },

    mounted () {
      this.loadUsers();
      this.getTempUser();
    }
}
</script>
