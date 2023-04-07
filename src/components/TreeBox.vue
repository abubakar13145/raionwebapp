<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div
    :style="{ width: `${baseWidth + 30}px`, display: `flex` }"
    class="title-block"
  >
    <h1 class="title-head">{{ title }}</h1>
    <div :style="{ width: `${500}px` }" class="btn-block">
      <label class="presets-label" for="presets">Presets</label>
      <select
        name="presets"
        id="presets"
        class="form-select"
        style="margin-right: 5px"
        :value="selectedPreset"
        @change="presetSelectionChange($event, selectedPreset)"
      >
        <option v-for="pr in presets" :value="pr.id">{{ pr.name }}</option>
      </select>
      <div class="dropdown">
        <a
          href="javascript:void(0);"
          class="btn btn-primary dropdown-toggle"
          role="button"
          id="dropdownMenuAddLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          >Preset</a
        >
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuAddLink"
        >
          <li>
            <a
              class="dropdown-item"
              href="#AddPresetModalToggle"
              data-bs-toggle="modal"
              role="button"
            >
              <i class="icon">
                <img
                  src="../assets/images/icon-folder-white.svg"
                  alt=""
                  class=""
                />
              </i>
              New
            </a>
          </li>
          <li>
            <a
              class="dropdown-item"
              data-bs-toggle="modal"
              role="button"
              @click="editPreset"
            >
              <i class="icon">
                <img
                  src="../assets/images/icon-box-white.svg"
                  alt=""
                  class=""
                />
              </i>
              Edit
            </a>
          </li>
          <li v-show="presets.length > 1">
            <a
              class="dropdown-item"
              href="#DropPresetQuestion"
              data-bs-toggle="modal"
              role="button"
            >
              <i class="icon">
                <img
                  src="../assets/images/icon-box-white.svg"
                  alt=""
                  class=""
                />
              </i>
              Drop
            </a>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <a
          :style="{ width: `${80}px` }"
          href="#AddProductModalToggle"
          data-bs-toggle="modal"
          @click="newProduct()"
          class="btn btn-primary"
          role="button"
          id="dropdownMenuAddLink"
          aria-expanded="false"
          >Add</a
        >
      </div>
    </div>
  </div>
  <div v-if="presets && presets.length > 0">
    <div v-if="!this.items || this.items.length == 0">
      <button class="btn btn-outline-primary" @click="createNewList()">
        New List
      </button>
    </div>
    <div :style="{ width: baseWidth }">
      <TreeItem
        @drop.stop="onListDrop($event, item)"
        @dragover.prevent
        @dragenter.prevent
        v-for="(item, index) in items"
        v-if="updated"
        :item="item"
        :deep="0"
        :odd="index % 2"
        :baseWidth="baseWidth"
        :path="[]"
        @added-item="addedItem($event)"
        @recalculate-height="calculateHeigt()"
        @add-before="addBeforeHandler($event)"
        @add-after="addAfterHandler($event)"
        :ref="`item${item.nodeId}`"
      >
      </TreeItem>
    </div>
    <br /><br />
    <div>
      <button class="btn btn-outline-primary" @click="sort()">
        Sort {{ isAsc ? "Desc" : "Asc" }}
      </button>
      <button
        class="btn btn-outline-primary"
        style="margin-left: 7px"
        @click="cleanTree()"
      >
        Remove checked items
      </button>
    </div>
    <div
      class="modal fade form-modal"
      id="AddProductModalToggle"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title">Add New Product</h5>
            <form>
              <div class="form-floating mb-28">
                <select
                  class="form-select"
                  v-model.trim="selectedParentProduct"
                  aria-label="Default select example"
                >
                  <option v-for="product in parentProducts" :value="product">
                    {{ product.name }}
                  </option>
                </select>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="Column 1"
                  v-model.trim="productName"
                  name="floatingInput1"
                  :class="productError ? 'input-error' : ''"
                />
                <label for="floatingInput1">Name</label>
                <span class="error-msg" v-if="productError">
                  {{ productError }}
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
                  :class="!productName ? 'disabled' : ''"
                  data-bs-target="#productAddedModal"
                  @click="applyAdd()"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade form-modal"
      id="EditProductModalToggle"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title">Edit Product</h5>
            <form>
              <div class="form-floating mb-28">
                <select
                  class="form-select"
                  v-model.trim="selectedParentProduct"
                  aria-label="Default select example"
                >
                  <option v-for="product in parentProducts" :value="product">
                    {{ product.name }}
                  </option>
                </select>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="Column 1"
                  v-model.trim="productName"
                  name="floatingInput1"
                  :class="productError ? 'input-error' : ''"
                />
                <label for="floatingInput1">Name</label>
                <span class="error-msg" v-if="productError">
                  {{ productError }}
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
                  :class="!productName ? 'disabled' : ''"
                  data-bs-target="#productAddedModal"
                  @click="applyEdit()"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade form-modal"
      id="AddPresetModalToggle"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title">Create Preset</h5>
            <form>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="Column 1"
                  v-model.trim="presetName"
                  name="floatingInput1"
                  :class="productError ? 'input-error' : ''"
                />
                <label for="floatingInput1">Name</label>
                <span class="error-msg" v-if="productError">
                  {{ productError }}
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
                  :class="!presetName ? 'disabled' : ''"
                  data-bs-target="#productAddedModal"
                  @click="createPreset()"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade form-modal"
      id="EditPresetModalToggle"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title">Edit Preset</h5>
            <form>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput1"
                  placeholder="Column 1"
                  v-model.trim="presetEditName"
                  name="floatingInput1"
                  :class="productError ? 'input-error' : ''"
                />
                <label for="floatingInput1">Name</label>
                <span class="error-msg" v-if="productError">
                  {{ productError }}
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
                  :class="!presetEditName ? 'disabled' : ''"
                  data-bs-target="#productAddedModal"
                  @click="updatePresetName()"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade form-modal"
      id="DropPresetQuestion"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title">Are you sure to delete this preset?</h5>
            <form>
              <div class="btn-row modal-btn-row">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-lg"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg"
                  data-bs-target="#productAddedModal"
                  @click="deletePreset()"
                >
                  Yes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
import { ref } from "vue";
import { v4 as uuid } from "uuid";

export default {
  name: "Tree Box",
  components: {
    TreeItem,
  },
  data() {
    return {
      items: [],
      presets: [],
      baseWidth: 1200,
      selectedParentProduct: null,
      itemToEdit: null,
      parentProducts: [],
      productName: "",
      productError: "",
      currentName: "",
      self: this,
      updated: true,
      isAsc: true,
      presetName: "",
      presetEditName: "",
      selectedPreset: "123",
    };
  },
  inject: ["executeSettings", "baseApp", "firstItem"],
  computed: {
    title: function () {
      return this.firstItem.value;
    },
  },
  provide: function () {
    return {
      fullTree: this.items,
      parentComponent: this,
      recalculateTree: function (parentComponent) {
        parentComponent.updated = false;

        parentComponent.$nextTick(() => {
          // Adding the component back in
          parentComponent.updated = true;

          parentComponent.updateTree();
        });
      },
      removeNode: function (id, parentComponent) {
        parentComponent.searchAndRemoveNode(parentComponent.items, id);

        parentComponent.updated = false;

        parentComponent.$nextTick(() => {
          // Adding the component back in
          parentComponent.updated = true;
        });

        parentComponent.updateTree();
      },
      editProductPressed(parentComponent, item) {
        parentComponent.newProduct();
        let parent = parentComponent.getParentProduct(item);
        parentComponent.itemToEdit = item;
        if (!parent)
          parentComponent.selectedParentProduct =
            parentComponent.parentProducts[0];
        else
          parentComponent.selectedParentProduct =
            parentComponent.parentProducts.find(
              (pProduct) => pProduct.nodeId == parent.nodeId
            );

        parentComponent.productName = item.name;

        parentComponent.editProduct();
      },
      updateTree: function (id, item, parentComponent, before, droppedItemId) {
        let itemToInsert = parentComponent.searchAndRemoveNode(
          parentComponent.items,
          id
        );

        if (droppedItemId) {
          if (item.children) {
            let indexOfChild = item.children.findIndex(
              (x) => x.nodeId == droppedItemId
            );
            if (!before) indexOfChild++;
            item.children.splice(indexOfChild, 0, itemToInsert);
          } else {
            item.children = [];
            item.children.push(itemToInsert);
          }
        } else {
          if (item.children) item.children.push(itemToInsert);
          else {
            item.children = [];
            item.children.push(itemToInsert);
          }
        }

        parentComponent.updated = false;

        parentComponent.$nextTick(() => {
          // Adding the component back in
          parentComponent.updated = true;
        });

        parentComponent.updateTree();
      },
      dropTree: async function (parentComponent) {
        parentComponent.updateTree();
      },
    };
  },
  mounted: async function () {
    await this.getPresetList();

    this.selectedPreset = this.presets.length > 0 ? this.presets[0].id : "";

    let selectedPreset = this.presets.find((x) => x.id == this.selectedPreset);

    this.items = selectedPreset.children;

    this.update = false;

    await this.$nextTick();

    this.update = true;

    await this.$nextTick();
  },
  methods: {
    enterSettings: function () {
      this.executeSettings(this.baseApp);
    },
    editProduct: function () {
      var myModalEl = document.getElementById("EditProductModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      if (!modal) modal = new bootstrap.Modal(myModalEl);

      modal.show();
    },
    editPreset: function () {
      var myModalEl = document.getElementById("EditPresetModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      if (!modal) modal = new bootstrap.Modal(myModalEl);

      let currPreset = this.presets.find((x) => x.id == this.selectedPreset);
      this.presetEditName = currPreset.name;

      modal.show();
    },
    newProduct: function () {
      let productList = [
        {
          name: "...",
          nodeId: null,
        },
      ];

      this.items.forEach((item) => {
        productList.push({
          name: item.name,
          nodeId: item.nodeId,
        });

        if (item.children) {
          let childArray = this.returnChildList(item.children);

          productList = productList.concat(childArray);
        }
        this.productName = "";
      });

      this.parentProducts = productList;
      this.selectedParentProduct = this.parentProducts[0];
    },
    getParentProduct(itemToSearch) {
      let index = this.items.findIndex(
        (item) => item.nodeId == itemToSearch.nodeId
      );

      if (index >= 0) {
        return null;
      }

      let foundElement = null;

      this.items.every((item) => {
        if (item.children) {
          foundElement = this.searchParent(item, item.children, itemToSearch);
          if (foundElement) return false;
        }

        return true;
      });

      return foundElement;
    },
    searchParent(parent, items, itemToSearch) {
      let index = items.findIndex((item) => item.nodeId == itemToSearch.nodeId);

      if (index >= 0) {
        return parent;
      }

      let foundElement = null;

      items.every((item) => {
        if (item.children) {
          foundElement = this.searchParent(parent, item.children, itemToSearch);
          if (foundElement) return false;
        }

        return true;
      });

      return foundElement;
    },
    applyAdd() {
      var myModalEl = document.getElementById("AddProductModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);

      let newProduct = {
        nodeId: uuid(),
        name: this.productName,
      };

      if (!this.items) this.items = [];

      if (this.selectedParentProduct.nodeId == null) {
        this.items.push(newProduct);
      } else {
        this.insertProduct(
          this.items,
          this.selectedParentProduct.nodeId,
          newProduct
        );
      }

      modal.hide();

      this.updateTree();

      this.refresh();
    },
    applyEdit() {
      var myModalEl = document.getElementById("EditProductModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);

      let parent = this.getParentProduct(this.itemToEdit);

      if (
        ((!parent &&
          this.selectedParentProduct &&
          this.selectedParentProduct.nodeId) ||
          (parent && parent.nodeId != this.selectedParentProduct.nodeId)) &&
        this.itemToEdit.children &&
        !this.existsInChildren(
          this.itemToEdit.children,
          this.selectedParentProduct.nodeId
        )
      ) {
        let nodeToEdit = this.searchAndRemoveNode(
          this.items,
          this.itemToEdit.nodeId
        );

        nodeToEdit.name = this.productName;
        if (this.selectedParentProduct.nodeId == null) {
          this.items.push(nodeToEdit);
        } else {
          this.insertProduct(
            this.items,
            this.selectedParentProduct.nodeId,
            nodeToEdit
          );
        }
      } else {
        this.itemToEdit.name = this.productName;
      }

      modal.hide();

      this.updateTree();

      this.refresh();
    },
    existsInChildren(items, itemId) {
      let exists = items.some((it) => it.nodeId == itemId);

      if (!exists) {
        items.every((it) => {
          if (it.children) {
            exists = this.existsInChildren(it.children, itemId);
            if (exists) return false;
          }
          return true;
        });
      }

      return exists;
    },
    insertProduct(items, parentProductId, item) {
      let itemToInsert = items.find((it) => it.nodeId == parentProductId);

      if (itemToInsert) {
        if (itemToInsert.children) {
          itemToInsert.children.push(item);
        } else {
          itemToInsert.children = [item];
        }

        return false;
      }

      items.every((it) => {
        return this.insertProduct(it.children, parentProductId, item);
      });

      return true;
    },
    returnChildList(items) {
      let list = [];
      items.forEach((item) => {
        list.push({
          name: item.name,
          nodeId: item.nodeId,
        });

        if (item.children) {
          let childArray = this.returnChildList(item.children);

          list = list.concat(childArray);
        }
      });

      return list;
    },
    async presetSelectionChange(event, prevValue) {
      let prevPreset = this.presets.find((x) => x.id == prevValue);

      prevPreset.children = this.items;

      this.selectedPreset = event.target.value;

      this.update = false;

      await this.$nextTick();

      let selectedPreset = this.presets.find((x) => x.id == event.target.value);

      this.items = selectedPreset.children;

      this.refresh();

      this.update = true;

      await this.$nextTick();
    },
    createPreset: async function () {
      if (!this.presetName) return;

      var myModalEl = document.getElementById("AddPresetModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);

      let newPreset = {
        name: this.presetName,
        children: [],
      };

      newPreset.id = await this.addPreset(newPreset);

      modal.hide();

      this.presets.push(newPreset);

      this.selectedPreset = newPreset.id;

      this.items = newPreset.items;

      this.presetName = "";

      this.refresh();

      this.update = false;

      await this.$nextTick();

      this.update = true;

      await this.$nextTick();
    },
    updatePresetName: async function () {
      let result = {
        id: this.selectedPreset,
        name: this.presetEditName,
      };

      var myModalEl = document.getElementById("EditPresetModalToggle");
      var modal = bootstrap.Modal.getInstance(myModalEl);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let newId = null;

      await fetch(`${this.$hostname}/Tree/update-preset`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          await this.getPresetList();
        });

      modal.hide();
    },
    deletePreset: async function () {
      let result = {
        id: this.selectedPreset,
      };

      var myModalEl = document.getElementById("DropPresetQuestion");
      var modal = bootstrap.Modal.getInstance(myModalEl);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      await fetch(`${this.$hostname}/Tree/delete-preset`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          await this.getPresetList();
        });

      this.selectedPreset = this.presets.length > 0 ? this.presets[0].id : "";

      let selectedPreset = this.presets.find(
        (x) => x.id == this.selectedPreset
      );

      this.updated = false;

      this.items = selectedPreset.children;

      this.refresh();

      this.update = true;

      await this.$nextTick();

      modal.hide();
    },
    createNewList: async function () {
      let newItem = {
        nodeId: uuid(),
        name: "Template",
      };

      this.items = [newItem];

      this.refresh();

      await this.$nextTick();

      this.update = true;

      await this.$nextTick();

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
    cleanTree: async function () {
      this.checkAndRemove(this.items);

      this.updated = false;

      await this.$nextTick();

      this.updated = true;

      await this.$nextTick();
    },
    checkAndRemove(items) {
      let toDelete = [];
      items.forEach((item) => {
        if (item.toDelete) toDelete.push(item);
      });

      toDelete.forEach((item) => this.searchAndRemoveNode(items, item.nodeId));

      items.forEach((item) => {
        if (item.children) this.checkAndRemove(item.children);
      });
    },
    sort: function () {
      this.isAsc = !this.isAsc;
      this.items.sort((a, b) =>
        a.name > b.name
          ? this.isAsc
            ? 1
            : -1
          : b.name > a.name
          ? this.isAsc
            ? -1
            : 1
          : 0
      );

      this.items.forEach((item) => {
        if (item.children) this.sortChildren(item.children);
      });

      this.updated = false;

      this.$nextTick(() => {
        this.updated = true;
      });
    },
    sortChildren(items) {
      items.sort((a, b) =>
        a.name > b.name
          ? this.isAsc
            ? 1
            : -1
          : b.name > a.name
          ? this.isAsc
            ? -1
            : 1
          : 0
      );

      items.forEach((item) => {
        if (item.children) this.sortChildren(item.children);
      });
    },
    addedItem: function (item) {
      let itemToInsert = this.searchAndRemoveNode(this.items, item.nodeId);

      if (item.droppedItem) {
        if (this.items) {
          let indexOfChild = this.items.findIndex(
            (x) => x.nodeId == item.droppedItem
          );
          if (!item.onTop) indexOfChild++;
          this.items.splice(indexOfChild, 0, itemToInsert);
        } else {
          this.items = [];
          this.items.push(itemToInsert);
        }
      } else {
        if (this.items) this.items.push(itemToInsert);
        else {
          this.items = [];
          this.items.push(itemToInsert);
        }
      }

      this.updated = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.updated = true;
      });

      this.updateTree();
    },
    updateTree: function () {
      let currPreset = this.presets.find((x) => x.id == this.selectedPreset);

      currPreset.children = this.items;

      this.updatePreset(currPreset);
    },
    refresh: function (callback) {
      this.updated = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.updated = true;
        if (callback) callback();
      });
    },
    refreshAsync: async function () {
      this.updated = false;

      await this.$nextTick();

      this.updated = true;
    },
    searchAndRemoveNode(items, id) {
      let index = items.findIndex((item) => item.nodeId == id);

      if (index >= 0) {
        let deletedItem = items.splice(index, 1)[0];

        return deletedItem;
      }

      let foundElement = null;

      items.every((item) => {
        if (item.children) {
          foundElement = this.searchAndRemoveNode(item.children, id);
          if (foundElement) return false;
        }

        return true;
      });

      return foundElement;
    },
    onListDrop: function (evt, currItem) {
      const item = evt.dataTransfer.getData("item");
      let eltDeep = evt.dataTransfer.getData("deep");
      const id = evt.dataTransfer.getData("id");

      let itemToInsert = this.searchAndRemoveNode(this.items, id);

      let before = evt.layerY < 17;

      if (currItem.children) currItem.children.push(itemToInsert);
      else currItem.children = [itemToInsert];

      this.updated = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.updated = true;
      });

      this.updateTree();
    },
    async addBeforeHandler(item) {
      let beforeIndex = this.items.findIndex((x) => x.nodeId == item.nodeId);
      let newItem = {
        nodeId: uuid(),
        name: "Template",
      };
      if (this.items) this.items.splice(beforeIndex, 0, newItem);
      else this.items = [newItem];

      this.refresh();

      this.update = false;

      await this.$nextTick();

      this.update = true;

      await this.$nextTick();

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
    async addAfterHandler(item) {
      let afterIndex = this.items.findIndex((x) => x.nodeId == item.nodeId) + 1;
      let newItem = {
        nodeId: uuid(),
        name: "Template",
      };
      if (this.items) this.items.splice(afterIndex, 0, newItem);
      else this.items = [newItem];

      this.refresh();

      this.update = false;

      await this.$nextTick();

      this.update = true;

      await this.$nextTick();

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
    calculateHeigt: function () {
      this.updated = false;

      this.$nextTick(() => {
        // Adding the component back in
        this.updated = true;
      });
    },
    addPreset: async function (preset) {
      let result = {
        name: preset.name,
        children: preset.children,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let newId = null;

      await fetch(`${this.$hostname}/Tree/add`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          newId = data.presetId;
        });

      return newId;
    },
    updatePreset: async function (preset) {
      let result = {
        nodeId: preset.id,
        name: preset.name,
        children: preset.children,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let newId = null;

      await fetch(`${this.$hostname}/Tree/update`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          newId = data.presetId;
        });

      return newId;
    },
    async getPresetList() {
      let loader = this.$loading.show({
        canCancel: false,
      });
      await fetch(`${this.$hostname}/Tree/list`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.presets = response.presets;
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
.presets-label {
  padding-top: 5px;
  padding-right: 8px;
  font-size: 18px;
  vertical-align: middle;
  display: table-cell;
}
.title-head {
  padding-left: 30px;
}
</style>
