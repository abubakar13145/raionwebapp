<template>
  <aside class="sidebar-block" style="z-index: 3">
    <header class="header">
      <a href="javascript:void(0);" class="logo">
        <h3 class="logo-header">{{ brandName }}</h3>
      </a>
      <a
        href="javascript:void(0);"
        class="navbar-handler-icon"
        v-on:click="clickNavbar"
      >
        <img alt="navbar arrow" src="../../assets/images/navbar-icon.svg" />
      </a>
    </header>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            href="javascript:void(0);"
            class="nav-link"
            v-bind:class="{ active: currentRouteName === 'tree' }"
          >
            <i class="icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="icon-path"
                  d="M2.90576 6.82007L10.9999 11.5042L19.0391 6.84754"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M10.9999 19.8092V11.495"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M9.10244 2.27337L4.20745 4.9959C3.09828 5.61007 2.1908 7.15005 2.1908 8.41505V13.5942C2.1908 14.8592 3.09828 16.3992 4.20745 17.0134L9.10244 19.7359C10.1474 20.3134 11.8616 20.3134 12.9066 19.7359L17.8016 17.0134C18.9108 16.3992 19.8183 14.8592 19.8183 13.5942V8.41505C19.8183 7.15005 18.9108 5.61007 17.8016 4.9959L12.9066 2.27337C11.8524 1.68671 10.1474 1.68671 9.10244 2.27337Z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M15.5833 12.1366V8.78167L6.88416 3.7583"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
            <span class="nav-link-text"
              ><router-link to="/">{{ firstItem }}</router-link></span
            >
          </a>
        </li>
        <li class="nav-item">
          <a
            href="javascript:void(0);"
            class="nav-link"
            v-bind:class="{ active: currentRouteName === 'product' }"
          >
            <i class="icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="icon-path"
                  d="M2.90576 6.82007L10.9999 11.5042L19.0391 6.84754"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M10.9999 19.8092V11.495"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M9.10244 2.27337L4.20745 4.9959C3.09828 5.61007 2.1908 7.15005 2.1908 8.41505V13.5942C2.1908 14.8592 3.09828 16.3992 4.20745 17.0134L9.10244 19.7359C10.1474 20.3134 11.8616 20.3134 12.9066 19.7359L17.8016 17.0134C18.9108 16.3992 19.8183 14.8592 19.8183 13.5942V8.41505C19.8183 7.15005 18.9108 5.61007 17.8016 4.9959L12.9066 2.27337C11.8524 1.68671 10.1474 1.68671 9.10244 2.27337Z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M15.5833 12.1366V8.78167L6.88416 3.7583"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
            <span class="nav-link-text"
              ><router-link to="/product">{{ secondItem }}</router-link></span
            >
          </a>
        </li>
        <li class="nav-item">
          <a
            href="javascript:void(0);"
            class="nav-link"
            v-bind:class="{ active: currentRouteName === 'productstree' }"
          >
            <i class="icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="icon-path"
                  d="M2.90576 6.82007L10.9999 11.5042L19.0391 6.84754"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M10.9999 19.8092V11.495"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M9.10244 2.27337L4.20745 4.9959C3.09828 5.61007 2.1908 7.15005 2.1908 8.41505V13.5942C2.1908 14.8592 3.09828 16.3992 4.20745 17.0134L9.10244 19.7359C10.1474 20.3134 11.8616 20.3134 12.9066 19.7359L17.8016 17.0134C18.9108 16.3992 19.8183 14.8592 19.8183 13.5942V8.41505C19.8183 7.15005 18.9108 5.61007 17.8016 4.9959L12.9066 2.27337C11.8524 1.68671 10.1474 1.68671 9.10244 2.27337Z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="icon-path"
                  d="M15.5833 12.1366V8.78167L6.88416 3.7583"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
            <span class="nav-link-text"
              ><router-link to="/productstree">{{ thirdItem }}</router-link></span
            >
          </a>
        </li>
      </ul>
    </nav>
    <div
      class="dropdown"
      style="width: 140px; padding-left: 30px; padding-bottom: 30px"
    >
      <a
        href="javascript:void(0);"
        class="btn btn-primary dropdown-toggle"
        role="button"
        id="dropdownMenuAddLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        >Settings</a
      >
      <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuAddLink"
      >
        <li>
          <a
            class="dropdown-item"
            @click="sidebarExecuted()"
            data-bs-toggle="modal"
            role="button"
          >
            <i class="icon">
              <img
                src="../../assets/images/icon-folder-white.svg"
                alt=""
                class=""
              />
            </i>
            Settings
          </a>
        </li>
      </ul>
    </div>
    <div class="sidebar-footer">
      <a href="javascript;void(0);" class="user-pic">
        <img alt="" src="../../assets/images/user-pic.jpg" class="" />
      </a>
      <div class="user-info-wrap">
        <div class="user-info">
          <h5 class="name">Amanda Smith</h5>
          <p class="email">email@example.com</p>
        </div>
        <a href="javascript;void(0);" class="arrow-block">
          <img src="../../assets/images/sidenav-arrow.svg" alt="" class="" />
        </a>
      </div>
    </div>
  </aside>
  <div
    class="modal fade form-modal"
    id="SettingsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Settings</h5>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput1"
                placeholder="Column 1"
                v-model.trim="brandNameEditing"
                name="floatingInput1"
                :class="brandError ? 'input-error' : ''"
              />
              <label for="floatingInput1">Brand</label>
              <span class="error-msg" v-if="brandError">
                {{ brandError }}
              </span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput1"
                placeholder="Column 1"
                v-model.trim="firstItemEditing"
                name="floatingInput1"
                :class="firstError ? 'input-error' : ''"
              />
              <label for="floatingInput1">First Link</label>
              <span class="error-msg" v-if="firstError">
                {{ firstError }}
              </span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput1"
                placeholder="Column 1"
                v-model.trim="secondItemEditing"
                name="floatingInput1"
                :class="secondError ? 'input-error' : ''"
              />
              <label for="floatingInput1">Second Link</label>
              <span class="error-msg" v-if="secondError">
                {{ secondError }}
              </span>
            </div>

            <div class="btn-row modal-btn-row">
              <button
                type="button"
                class="btn btn-outline-primary btn-lg"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary btn-lg"
                :class="
                  !brandName || !firstItem || !secondItem ? 'disabled' : ''
                "
                data-bs-target="#productAddedModal"
                @click="saveSettings()"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarPage",
  data() {
    return {
      brandError: "",
      firstError: "",
      secondError: "",
      thirderror: "",
      brandName: "Raion",
      firstItem: "Tree",
      secondItem: "Products",
      thirdItem: "Products Tree",
      brandNameEditing: "Raion",
      firstItemEditing: "Tree",
      secondItemEditing: "Products",
      thirdItemEditing: "ProductsTree",
    };
  },
  created: function () {
    this.readSettings();
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    sidebarExecuted: function () {
      var myModalEl = document.getElementById("SettingsModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      if (!modal) modal = new bootstrap.Modal(myModalEl);

      this.brandNameEditing = this.brandName;
      this.firstItemEditing = this.firstItem;
      this.secondItemEditing = this.secondItem;

      modal.show();
    },
    saveSettings: function () {
      var myModalEl = document.getElementById("SettingsModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      this.brandName = this.brandNameEditing;
      this.firstItem = this.firstItemEditing;
      this.secondItem = this.secondItemEditing;

      this.updateSettings();
      modal.hide();
    },
    //Toggle class to body on click of navbar handler icon
    clickNavbar: function (e) {
      const el = document.body;
      const bodyHasClass = document.body.classList.contains("menu-close");
      if (bodyHasClass) {
        el.classList.remove("menu-close");
      } else {
        el.classList.add("menu-close");
      }
    },
    getProducts: function () {
      fetch(`${this.$hostname}/Product/list`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.products = response.products;
        });
    },
    refreshSettings: function () {
      this.$emit("names-changed", {
        firstItem: this.firstItem,
        secondItem: this.secondItem,
      });
    },
    async updateSettings() {
      this.refreshSettings();
      let result = {
        useParentProduct: true,
        brandName: this.brandName,
        firstName: this.firstItem,
        secondName: this.secondItem,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let newId = null;

      await fetch(`${this.$hostname}/Settings/settings`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          newId = data.presetId;
        });

      return newId;
    },
    async readSettings() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      await fetch(`${this.$hostname}/Settings/settings`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.brandName = response.brandName;
          this.firstItem = response.firstName;
          this.secondItem = response.secondName;
          this.refreshSettings();
        });

      this.updated = false;

      await this.$nextTick();

      this.updated = true;

      await this.$nextTick();

      loader.hide();
    },
  },
};
</script>

<style lang="scss">
.logo {
  color: #000000;
  text-decoration: none;
}

.logo-header {
  margin: 0 0 0 20px;
}
</style>
