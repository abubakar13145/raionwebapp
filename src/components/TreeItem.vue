<template>
  <div
    :z-index="deep + 1"
    @drop.prevent
    :style="{
      height: `${componentHeight}px`,
      width: `${baseWidth - deep * 30}px`,
    }"
    class="tree-item"
    v-if="update"
  >
    <div
      @drop.stop="onSameListDrop($event)"
      :draggable="true"
      @dragstart="startDrag($event, item)"
      @dragenter.stop="dragEnter($event)"
      @dragleave.stop="dragLeave($event)"
      style="height: 50px; width: 100%"
      class="header-item"
      :class="{
        odd: odd,
        even: !odd,
        'hover-accepted': dragEnterFlag,
        'hover-rejected': dragEnterErrorFlag,
      }"
      @dblclick="setEditing()"
    >
      <div class="checkbox-item">
        <input
          type="checkbox"
          class="dt-checkboxes sub-product"
          v-model="item.toDelete"
        /><label></label>
      </div>
      <div
        style="width: 50px"
        class="can-expand direction-left"
        @click="expand()"
      >
        <i class="expand-icon" :class="{ expanding: item.expanded }"></i>
      </div>
      <div
        class="text-field"
        v-show="!editing"
        @dragover.prevent
        @dragenter.prevent
      >
        {{ item.name }}
      </div>
      <div
        class="text-field"
        @dragover.prevent
        @dragenter.prevent
        v-show="editing"
      >
        <input
          ref="nameentering"
          type="text"
          v-model="editName"
          @focusout="cancel()"
          @keyup.enter="save()"
          @keyup.esc="cancel()"
        />
      </div>
      <div class="dropdown add-before-field">
        <a
          href="javascript:void(0);"
          class="link-item"
          role="button"
          id="dropdownMenuEditLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="icon">
            <img src="icon-more-horzontal.svg" alt="" class="" />
          </i>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuEditLink"
        >
          <li @click="addBefore()">
            <a
              class="dropdown-item"
              id="edit3b690aed-4ff3-47e7-d8d5-08dafdd26653"
              href="javascript:void(0);"
            >
              <i class="icon">
                <img src="icon-edit-white.svg" alt="" class="" />
              </i>
              Add Before
            </a>
          </li>
          <li @click="addAfter()">
            <a
              class="dropdown-item"
              id="edit3b690aed-4ff3-47e7-d8d5-08dafdd26653"
              href="javascript:void(0);"
            >
              <i class="icon">
                <img src="icon-edit-white.svg" alt="" class="" />
              </i>
              Add After
            </a>
          </li>
          <li @click="editProduct(item)">
            <a
              class="dropdown-item"
              id="edit3b690aed-4ff3-47e7-d8d5-08dafdd26653"
              href="javascript:void(0);"
            >
              <i class="icon">
                <img src="icon-edit-white.svg" alt="" class="" />
              </i>
              Edit
            </a>
          </li>
          <li @click="remove()">
            <a
              class="dropdown-item"
              href="javascript:void(0);"
              id="delete3b690aed-4ff3-47e7-d8d5-08dafdd26653"
            >
              <i class="icon">
                <img src="icon-delete-white.svg" alt="" class="" />
              </i>
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div
      style="width: 100%; position: relative"
      v-show="item.expanded"
      @dragover.prevent
      @dragenter.prevent
    >
      <TreeItem
        v-for="(it, index) in itemsToShow"
        :item="it"
        :deep="deep + 1"
        :odd="(index + !odd) % 2"
        :baseWidth="baseWidth"
        :path="[...path, item.nodeId]"
        @added-item="addedItem($event)"
        @add-before="addBeforeHandler($event)"
        @add-after="addAfterHandler($event)"
        @recalculate-height="calculateHeigt(item.children)"
        :ref="`item${it.nodeId}`"
      ></TreeItem>
      <div
        @dblclick="addAfterHandler(this.item)"
        @drop.stop="onListDrop($event)"
        :style="{ width: `${baseWidth - (deep + 1) * 30}px` }"
        class="no-items"
        :class="{ odd1: odd, even1: !odd }"
        v-if="!item.children || item.children.length == 0"
      >
        No items. Double click to add new or drop other item
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
import { ref, toRaw } from "vue";
import jQuery from "jquery";
import { v4 as uuid } from "uuid";
import { VueDraggableNext } from "vue-draggable-next";

const $ = jQuery;
window.$ = $;

export default {
  name: "TreeItem",
  props: ["item", "deep", "odd", "baseWidth", "path"],
  inject: [
    "fullTree",
    "updateTree",
    "parentComponent",
    "removeNode",
    "dropTree",
    "editProductPressed",
    "recalculateTree",
  ],
  mounted: function () {
    this.itemsToShow = this.item.children ? ref(this.item.children) : ref([]);
  },
  components: {
    TreeItem,
    draggable: VueDraggableNext,
  },
  computed: {
    componentHeight: function () {
      this.refreshKey.value;
      let height = 50;

      if (this.item.expanded) {
        if (this.item.children)
          height += this.calculateHeigt(this.item.children);
        else height += 50;
      }
      return height;
    },
  },
  data() {
    return {
      itemsToShow: ref([]),
      editing: ref(false),
      editName: ref(""),
      dragEnterFlag: false,
      dragEnterErrorFlag: false,
      update: true,
      expanded: true,
      refreshKey: ref(0),
    };
  },
  methods: {
    editProduct(product) {
      this.editProductPressed(this.parentComponent, product);
    },
    calculateHeigt(items) {
      let height = 0;
      if (this.item.expanded && (!items || items.length == 0)) {
        height += 51;
      }
      items.forEach((child) => {
        height += 51;
        if (child.expanded) {
          if (child.children && child.children.length > 0) {
            height += this.calculateHeigt(child.children);
          } else {
            height += 51;
          }
        }
      });

      return height;
    },
    save: function () {
      this.item.name = this.editName;
      this.item.new = undefined;
      this.editing = false;

      this.dropTree(this.parentComponent);
    },
    cancel: function () {
      this.editing = false;
      if (this.item.new) {
        this.removeNode(this.item.nodeId, this.parentComponent);
      }

      this.dropTree(this.parentComponent);
    },
    setEditing() {
      this.editing = true;
      this.editName = this.item.name;

      this.$nextTick(() => {
        if (this.$refs.nameentering) {
          this.$refs.nameentering.focus();
          this.$refs.nameentering.select();
        }
      });
    },
    clickElement() {
      if (this.editing) this.$refs.nameentering.focus();
    },
    expand: function () {
      this.item.expanded = !this.item.expanded;
      //this.refreshKey.value++;
      //this.calculateHeigt(this.item.children);
      this.recalculateTree(this.parentComponent);
    },
    remove() {
      this.removeNode(this.item.nodeId, this.parentComponent);
    },
    handleBlur(event) {
      // if the blur was because of outside focus
      // currentTarget is the parent element, relatedTarget is the clicked element
      if (!event.currentTarget.contains(event.relatedTarget)) {
        alert("ok");
      }
    },
    startDrag(evt, item) {
      if (this.editing) return;

      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";

      let res = toRaw(item);
      evt.dataTransfer.setData("id", res.nodeId);
      evt.dataTransfer.setData("item", res.name);
      evt.dataTransfer.setData("deep", this.deep);
    },
    dragEnter: function (evt) {
      let eltDeep = evt.dataTransfer.getData("deep");
      const id = evt.dataTransfer.getData("id");

      if (this.path.some((x) => x == id)) this.dragEnterErrorFlag = true;
      else this.dragEnterFlag = true;
    },
    dragLeave: function (evt) {
      this.dragEnterFlag = false;
      this.dragEnterErrorFlag = false;
    },
    onDrop(evt) {
      const item = evt.dataTransfer.getData("item");
      const id = evt.dataTransfer.getData("id");
      let eltDeep = evt.dataTransfer.getData("deep");

      this.dropFinished(id, item, eltDeep, false, null, this.path);
    },
    onListDrop(evt) {
      const item = evt.dataTransfer.getData("item");
      let eltDeep = evt.dataTransfer.getData("deep");
      const id = evt.dataTransfer.getData("id");
      this.dropFinished(id, item, eltDeep, false, null, this.path);
    },
    onSameListDrop(evt) {
      const item = evt.dataTransfer.getData("item");
      let eltDeep = evt.dataTransfer.getData("deep");
      const id = evt.dataTransfer.getData("id");

      let onTop = this.isOnTop(evt);

      this.$emit("added-item", {
        nodeId: id,
        name: item,
        eltDeep: eltDeep,
        onTop: onTop,
        droppedItem: this.item.nodeId,
        path: this.path,
      });
    },
    isOnTop(event) {
      return event.layerY < 17;
    },
    dropFinished(id, item, eltDeep, before, droppedItemId, path) {
      this.dragEnterErrorFlag = false;
      this.dragEnterFlag = false;

      if (path.some((x) => x == id)) return;

      this.updateTree(
        id,
        this.item,
        this.parentComponent,
        before,
        droppedItemId
      );

      this.itemsToShow = this.item.children ? ref(this.item.children) : ref([]);
    },
    addedItem(item) {
      this.dropFinished(
        item.nodeId,
        item.name,
        item.eltDeep,
        item.onTop,
        item.droppedItem,
        item.path
      );
    },
    async addNewRow() {
      let newItem = {
        nodeId: uuid(),
        name: "Template",
        new: true,
      };

      if (this.item.children) this.item.children.push(newItem);
      else this.item.children = [newItem];

      this.itemsToShow = this.item.children ? ref(this.item.children) : ref([]);

      this.update = false;

      await this.$nextTick();

      this.update = true;

      await this.$nextTick();

      console.log(this.$refs);
      console.log(this.item);

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
    addBefore() {
      this.$emit("add-before", this.item);
    },
    async addBeforeHandler(item) {
      let beforeIndex = this.item.children.findIndex(
        (x) => x.nodeId == item.nodeId
      );
      let newItem = {
        nodeId: uuid(),
        name: "Template",
        new: true,
      };

      console.log(this.$refs);
      if (this.item.children)
        this.item.children.splice(beforeIndex, 0, newItem);
      else this.item.children = [newItem];

      await this.$nextTick();

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
    addAfter() {
      this.$emit("add-after", this.item);
    },
    async addAfterHandler(item) {
      let afterIndex =
        this.item.children.findIndex((x) => x.nodeId == item.nodeId) + 1;
      let newItem = {
        nodeId: uuid(),
        name: "Template",
        new: true,
      };
      if (this.item.children) this.item.children.splice(afterIndex, 0, newItem);
      else this.item.children = [newItem];

      await this.$nextTick();

      this.$refs[`item${newItem.nodeId}`][0].setEditing();
    },
  },
};
</script>

<style lang="scss">
$primary: #1abc9c;
$dark: #2c3e50;
$white: #ffffff;

.expand-icon {
  border: solid;
  border-color: var(easy-table-body-row-font-color);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  transition: 0.2s;
  margin-left: 2px;
}

.expanding {
  transform: rotate(45deg);
}

.tree-item {
  position: relative;
  left: 30px;
  border: solid;
  border-width: 1px;
  border-color: #cfcfcf;
  border-radius: 2px;
}

.header-item {
  border: solid;
  border-width: 1px;
  border-color: #58967d;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  touch-action: none;
  display: flex;
  align-items: center;
}

.checkbox-item {
  position: relative;
  margin: 2px;

  .dt-checkboxes {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 1;
    margin-left: 0;
    width: 18px;
    height: 18px;
    &:checked {
      + label {
        &::before {
          border-color: $primary;
          background-color: $primary;
          background-image: url(../assets/images/icon-checkmark-right.svg);
          background-size: 18px 18px;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }
  }
  label {
    position: relative;
    font-weight: 600;
    display: block;
    width: 18px;
    height: 18px;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border: 2px solid #ecf0f1;
      background-color: $white;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
  }
}

.text-field {
  padding-left: 18px;
}

.no-items {
  height: 50px;
  width: 100%;
  position: relative;
  left: 30px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  border: solid;
  border-width: 1px;
  border-color: #dfe5e3;
  border-radius: 2px;
}

.add-before-field {
  margin-left: auto;
  margin-right: 5px;
  width: 25px !important;
  fill: $primary !important;
  color: $dark !important;
  border-radius: 4px;
  align-content: center;
}

.add-after-field {
  width: 25px !important;
  margin-right: 5px;
  background-color: $primary !important;
  fill: $primary !important;
  color: $dark !important;
  border-radius: 4px;
  align-content: center;
}

.add-child-field {
  width: 120px !important;
  margin-right: 5px;
  background-color: $primary !important;
  fill: $primary !important;
  color: $dark !important;
  border-radius: 4px;
  align-content: center;
}

.delete-field {
  width: 25px !important;
  background-color: $primary !important;
  fill: $primary !important;
  color: $dark !important;
  border-radius: 4px;
  align-content: center;
}

.hover-accepted {
  border-color: #09d51a;
  border-width: 3px;
}

.hover-rejected {
  border-color: #d50e22;
  border-width: 3px;
}

.background {
  background-color: #c0c0c0;
}

.background-empty {
  border-top: solid;
  border-width: 1px;
  border-color: #58967d;
  border-radius: 2px;
  background-color: #877f7f;
  height: 5px;
  font-size: 1px;
}

.odd {
  background-color: #9fe7d8;
}

.even {
  background-color: #eef8f6;
}

.odd1 {
  background-color: #e3e3e3;
}

.even1 {
  background-color: #e3e3e3;
}
</style>
