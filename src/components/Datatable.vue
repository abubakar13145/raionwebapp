<template>
  <div v-if="show">
    <div class="data-table-head">
      <div class="search-block">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          v-model="searchValue"
        />
      </div>
      <div class="data-sort-block">
        <select name="" id="" class="form-select" v-model="searchField">
          <option value="name">Name</option>
          <option
            v-for="column in columns"
            :value="column.name.replace(/\s+/g, '')"
            selected
          >
            {{ column.name }}
          </option>
        </select>
      </div>
    </div>
    <EasyDataTable
      v-model:items-selected="itemsSelected"
      :headers="headers"
      :items="items"
      :sort-by="sortBy"
      :sort-type="sortType"
      table-class-name="table-style"
      :search-field="searchField"
      :search-value="searchValue"
      :theme-color="'#3CC6AB'"
      @update:items-selected="itemsSelected = selectRow($event, items)"
      alternating
      buttons-pagination
      :loading="items.length == 0"
      must-sort
    >
      <template #item-operation="item">
        <div class="dropdown">
          <a
            href="javascript:void(0);"
            role="button"
            id="dropdownMenuEditLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="icon">
              <img
                src="../assets/images/icon-more-horzontal.svg"
                alt=""
                class=""
              />
            </i>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuEditLink"
          >
            <li>
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="editProduct(item.itemObject)"
              >
                <i class="icon">
                  <img
                    src="../assets/images/icon-edit-white.svg"
                    alt=""
                    class=""
                  />
                </i>
                Edit
              </a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="deleteProduct(item.itemObject)"
              >
                <i class="icon">
                  <img
                    src="../assets/images/icon-delete-white.svg"
                    alt=""
                    class=""
                  />
                </i>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </template>
      <template #header-operation="header">
        <a
          class="link-item"
          data-bs-toggle="modal"
          href="#editColumnsModal"
          role="button"
        >
          <i class="icon">
            <img src="../assets/images/icon-edit-primary.svg" alt="" class="" />
          </i>
          Edit Columns
        </a>
      </template>
      <template #expand="item">
        <table
          style="width: 100%"
          v-if="item.itemObject.subProducts.length > 0"
        >
          <tbody class="vue3-easy-data-table__body">
            <tr class="subrow" v-for="product in item.itemObject.subProducts">
              <td class="direction-left">
                <div
                  class="easy-checkbox-openrow"
                  @click="updateSelection(product)"
                >
                  <input
                    type="checkbox"
                    data-product-id="3b690aed-4ff3-47e7-d8d5-08dafdd26653"
                    v-model="product.selected"
                  /><label></label>
                </div>
              </td>
              <td class="direction-left" id="test">{{ product.name }}</td>
              <td class="direction-left" v-for="value in product.values">
                {{ value.value ? value.value : "-" }}
              </td>
              <td class="direction-left">
                <div class="dropdown">
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
                    <li @click="editProduct(product)">
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
                    <li @click="deleteProduct(product)">
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
              </td>
            </tr>
          </tbody>
          <tbody></tbody>
        </table>
        <div v-else>No subproducts</div>
      </template>
    </EasyDataTable>
    <br /><br />
    <button class="btn btn-outline-primary" @click="archive()">Archive</button>
  </div>
</template>

<script>
import { toRaw, ref, onUpdated } from "vue/dist/vue.esm-bundler";
import moment from "moment";
import jQuery from "jquery";

const $ = jQuery;
window.$ = $;

export default {
  name: "DatatablePage",
  setup() {
    const count = ref(0);

    const renderComponent = () => {
      count.value++;
    };

    return {
      count,
      renderComponent,
    };
  },
  data() {
    return {
      items: [],
      show: true,
      itemLength: 0,
      selected: [],
      columns: [],
      products: [],
      categories: [],
      table: null,
      productName: "",
      newProductData: [],
      selectedCategory: null,
      rawEditValue: null,
      rawEditName: null,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Category", value: "category", sortable: true },
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Operation", value: "operation" },
      ],
      items: [],
      itemsSelected: ref([]),
      sortBy: "player",
      sortType: "asc",
      searchField: "name",
      searchValue: "",
    };
  },
  mounted: function () {
    this.getColumns();

    // Update the count of items that is not blank
    this.items.forEach((items, i) => {
      if (items.column1) {
        this.itemLength++;
      }
    });
  },
  computed: {
    // select all checked and unchecked
    selectAll: {
      get: function () {
        return this.products
          ? this.products.every((item) => item.selected)
          : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.products.forEach(function (items, i) {
            if (items.name) {
              items.selected = true;
            } else {
              items.selected = false;
            }
            $(`.sub-product`).prop("checked", true);
          });
        } else {
          this.products.forEach(function (items, i) {
            if (items.name) {
              items.selected = false;
            } else {
              items.selected = true;
            }
          });
          $(".sub-product").prop("checked", false);
        }
        this.selected = selected;
      },
    },
  },
  methods: {
    refresh: function () {
      this.getColumns();
    },
    updateSelection: function (product) {
      product.selected = !product.selected;
    },
    selectRow: (item, listOfItems) => {
      listOfItems.forEach((item) => {
        item.itemObject.subProducts.forEach((prod) => {
          prod.selected = false;
        });
      });

      item.forEach((item) => {
        item.itemObject.subProducts.forEach((prod) => {
          prod.selected = true;
        });
      });

      return item;
    },
    setHeader() {
      this.headers = [
        { text: "Name", value: "name", sortable: true },
        { text: "Category", value: "category", sortable: true },
        ...this.columns.map((column) => {
          return {
            text: column.name,
            value: `${column.name.replace(/\s+/g, "")}`,
            sortable: true,
          };
        }),
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Operation", value: "operation" },
      ];
    },
    setData() {
      this.items = [
        ...this.products.map((product) => {
          let item = {
            itemObject: product,
            name: product.name,
            category: product.categoryName,
            lastUpdated: this.formatDate(product.updated),
          };

          product.values
            .map((value) => {
              let val = {
                key: value.columnName.replace(/\s+/g, ""),
                value: value.value,
              };
              return val;
            })
            .forEach((v) => {
              item[v.key] = v.value;
            });

          return item;
        }),
      ];
    },
    checkBoxClick: function (product) {
      $(`#prod${product.id} .sub-product`).prop("checked", product.selected);
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("YYYY /MMM");
      }
    },
    editProduct: function (product) {
      this.productName = product.name;
      this.newProductData = this.columns.map((column) => {
        let val = product.values.find((pr) => pr.columnId === column.columnId);
        return {
          id: column.columnId,
          name: column.name,
          columnType: column.columnType,
          value: val ? val.value : "",
        };
      });
    },
    getColumns: function () {
      fetch(`${this.$hostname}/Column/columns`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.columns = [];
          this.columns = response.columns;
          this.setHeader();
          this.getProducts();
        });
    },
    getCategories: function () {
      fetch(`${this.$hostname}/Product/categories/list`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.categories = [];
          this.categories = response.categories;

          this.selectedCategory = this.categories[0];

          this.products.forEach((product) => {
            product.selectedCategory = this.categories.find(
              (x) => x.id === product.categoryId
            );
          });
        });
    },
    getProducts: function () {
      fetch(`${this.$hostname}/Product/list`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.products = [];

          if (!response.products) {
            this.getCategories();
            return;
          }

          response.products.forEach((product) => {
            product.isEdit = false;
            product.isCategoryEdit = false;
            product.selectedCategory = this.categories.find(
              (x) => x.id === product.categoryId
            );
            product.selected = false;
            this.columns.forEach((column) => {
              let val = product.values.find(
                (x) => x.columnId == column.columnId
              );

              if (val) {
                val.isEdit = false;
                val.order = column.order;
                val.columnType = column.columnType;
                val.mandatory = column.mandatory;
                val.format = column.format;
                val.formatType = column.formatType;
                val.example = column.example;
              } else {
                let newVal = {
                  columnId: column.columnId,
                  columnName: column.name,
                  columnType: column.columnType,
                  mandatory: column.mandatory,
                  valueId: null,
                  value: null,
                  isEdit: false,
                  format: column.format,
                  formatType: column.formatType,
                  example: column.example,
                  error: "",
                  order: column.order,
                };

                product.values.push(newVal);
              }
            });
            product.values.sort((a, b) => a.order - b.order);

            product.subProducts.forEach((subProduct) => {
              subProduct.isEdit = false;
              subProduct.isCategoryEdit = false;
              subProduct.selectedCategory = this.categories.find(
                (x) => x.id === product.categoryId
              );
              subProduct.selected = false;
              this.columns.forEach((column) => {
                let val = subProduct.values.find(
                  (x) => x.columnId == column.columnId
                );

                if (val) {
                  val.isEdit = false;
                  val.order = column.order;
                  val.columnType = column.columnType;
                  val.mandatory = column.mandatory;
                  val.format = column.format;
                  val.formatType = column.formatType;
                } else {
                  let newVal = {
                    columnId: column.columnId,
                    columnName: column.name,
                    columnType: column.columnType,
                    mandatory: column.mandatory,
                    valueId: null,
                    value: null,
                    isEdit: false,
                    format: column.format,
                    formatType: column.formatType,
                    error: "",
                    order: column.order,
                  };

                  subProduct.values.push(newVal);
                }

                subProduct.values.sort((a, b) => a.order - b.order);
              });
            });
          });

          this.products = response.products;

          this.setData();
          this.getCategories();
        });
    },
    archive: function () {
      let fproducts = this.itemsSelected.map((item) => item.itemObject.id);

      this.items.forEach((item) => {
        item.itemObject.subProducts.forEach((product) => {
          if (product.selected) fproducts.push(product.id);
        });
      });

      let result = {
        products: fproducts,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Product/archive`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();
          this.getColumns();
        });
    },
    getValue: function (val) {
      return val?.value ? val.value : "-";
    },
    getValueObject: function (column, values) {
      let val = values.find((value) => value.columnId === column.columnId);

      return val;
    },
    dynamicEdit: function (product) {
      this.products.forEach((pr) => {
        pr.isEdit = false;
        pr.isCategoryEdit = false;
        pr.values.forEach((val) => {
          val.isEdit = false;
        });
      });

      product.isEdit = true;
      this.rawEditName = product.name;
    },
    dynamicCategoryEdit: function (product) {
      this.products.forEach((pr) => {
        pr.isCategoryEdit = false;
        pr.isEdit = false;
        pr.values.forEach((val) => {
          val.isEdit = false;
        });
      });

      product.isCategoryEdit = true;
    },
    dynamicValueEdit: function (value) {
      this.rawEditValue = value.value;

      this.products.forEach((pr) => {
        pr.isCategoryEdit = false;
        pr.isEdit = false;
        pr.values.forEach((val) => {
          val.isEdit = false;
        });
      });

      value.isEdit = true;
    },
    cancelValueEdit: function () {
      if (
        !this.products.find((product) =>
          product.values.find((value) => value.isEdit)
        )
      )
        return;

      this.products.forEach((pr) => {
        pr.isCategoryEdit = false;
        pr.isEdit = false;
        pr.values.forEach((val) => {
          if (val.isEdit) {
            val.value = this.rawEditValue;
          }
          val.isEdit = false;
        });
      });
    },
    cancelNameEdit: function (product) {
      product.name = this.rawEditName;
      product.isEdit = false;
    },
    applyCategory: function (product) {
      this.products.forEach((pr) => {
        pr.isCategoryEdit = false;
        pr.isEdit = false;
        pr.values.forEach((val) => {
          val.isEdit = false;
        });
      });

      product.categoryId = product.selectedCategory.id;
      product.categoryName = product.selectedCategory.name;

      let result = {
        productId: product.id,
        categoryId: product.categoryId,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Product/update/category`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();

          alert("column updated");
        });
    },
    applyName: function (product) {
      if (!product.name) {
        product.error = "Name is mandatory";
        return;
      }

      this.products.forEach((pr) => {
        pr.isCategoryEdit = false;
        pr.isEdit = false;
        pr.values.forEach((val) => {
          val.isEdit = false;
        });
      });

      let result = {
        productId: product.id,
        name: product.name,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Product/update/name`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();

          alert("column updated");
        });
    },
    applyValue: function (product, value) {
      value.error = "";
      if (value.mandatory && !value.value) value.error = "Column is mandatory";
      else if (value.value && !this.checkColumnFormat(value)) {
        value.error = "Invalid Format";
      } else if (value.columnType == 2 && column.value) {
        if (value.formatType == 1 && !this.checkDateFormat(value)) {
          value.error = `Invalid date format ${value.format}`;
        } else if (value.formatType == 2 && !this.checkNumberFormat(value)) {
          value.error = `Invalid masked format ${value.format}`;
        }
      } else value.error = "";

      if (value.error) return;

      value.isEdit = false;

      if (value.valueId) {
        this.updateValue(value);
      } else {
        this.newValue(product, value);
      }
    },
    checkColumnFormat: function (value) {
      switch (value.columnType) {
        case 0:
          return !isNaN(value.value);
        case 1:
          return Number.isInteger(parseInt(value.value));
      }

      return true;
    },
    checkDateFormat: function (column) {
      let date = moment(column.value.trim(), column.format.trim(), true);

      return date.isValid();
    },
    checkNumberFormat: function (column) {
      let format = column.format.trim();

      return column.value.trim().match(new RegExp(format));
    },
    cancelEditing: function () {},
    newValue: function (product, value) {
      let column = this.columns.find((x) => x.columnId === value.columnId);
      let result = {
        productId: product.id,
        columnId: value.columnId,
        columnType: column.columnType,
        value: value.value,
        formatType: column.formatType,
        format: column.format,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Value/add`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();
        });
    },
    updateValue: function (value) {
      let column = this.columns.find((x) => x.columnId === value.columnId);
      let result = {
        valueId: value.valueId,
        columnType: column.columnType,
        value: value.value,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Value/update`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();

          alert("column updated");
        });
    },
    editProduct: function (product) {
      this.$emit("edit-clicked", product);
    },
    deleteProduct: function (product) {
      let result = {
        products: [product.id],
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      let loader = this.$loading.show({
        canCancel: false,
      });

      fetch(`${this.$hostname}/Product/archive`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          loader.hide();
          this.getColumns();
        });
    },
  },
};
</script>

<style lang="scss">
$checkbox-border-color: rgba(0, 0, 0, 0.54);

$checkbox-size: 1.3em;
$checkbox-margin: 1em 0;
$checkbox-padding: 0.2em;
$checkbox-border-width: 1px;
$checkbox-border-radius: 0.125em;
$checkbox-label-padding: 0.6em;

$checkmark-width: 0.13em;
$checkmark-color: #fff;

$line-width: 0.125em;
$line-color: #fff;

.table-style {
  --easy-table-header-font-color: #95a5a6;

  --easy-table-body-even-row-background-color: #9fe7d8;
  --easy-table-body-row-background-color: #eef8f6;

  --easy-table-body-row-height: 52px;
  --easy-table-body-row-font-size: 14px;
  font-weight: 600;
}

.subrow {
  height: 48px;
}

.easy-checkbox-openrow {
  position: relative;
  width: $checkbox-size;
  height: $checkbox-size;
  font-size: var(--easy-table-body-row-font-size);
  margin: 0 auto;
  label {
    cursor: pointer;
    display: inline;
    line-height: $checkbox-size;
    vertical-align: top;
    clear: both;

    &:before,
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
    }

    &:before {
      width: $checkbox-size;
      height: $checkbox-size;
      background: #fff;
      border: $checkbox-border-width solid $checkbox-border-color;
      border-radius: $checkbox-border-radius;
      cursor: pointer;
      transition: background 0.3s;
    }
  }

  input[type="checkbox"] {
    outline: 0;
    visibility: hidden;
    width: $checkbox-size;
    margin: 0;
    display: block;
    float: left;
    font-size: inherit;

    &:checked {
      + label:before {
        border: none;
        background: #3cc6ab;
      }
      + label:after {
        $checkmark-size: $checkbox-size - 2 * $checkbox-padding;
        transform: translate(
            $checkbox-padding,
            calc($checkbox-size / 2) - calc($checkmark-size / 2.6)
          )
          rotate(-45deg);
        width: $checkmark-size;
        height: calc($checkmark-size / 2);
        border: $checkmark-width solid $checkmark-color;
        border-top-style: none;
        border-right-style: none;
      }
    }

    &.allSelected {
      + label:before {
        border: none;
        background: #3cc6ab;
      }
      + label:after {
        $checkmark-size: $checkbox-size - 2 * $checkbox-padding;
        transform: translate(
            $checkbox-padding,
            calc($checkbox-size / 2) - calc($checkmark-size / 2.6)
          )
          rotate(-45deg);
        width: $checkmark-size;
        height: calc($checkmark-size / 2);
        border: $checkmark-width solid $checkmark-color;
        border-top-style: none;
        border-right-style: none;
      }
    }
    &.partSelected {
      + label:before {
        border: none;
        background: #3cc6ab;
      }
      + label:after {
        $line-size: $checkbox-size - 2 * $checkbox-padding;
        transform: translate(
          $checkbox-padding,
          calc($checkbox-size / 2) - calc($line-width / 2)
        );
        width: $line-size;
        height: calc($line-size / 2);
        border: $line-width solid $line-color;
        border-bottom-style: none;
        border-right-style: none;
        border-left-style: none;
      }
    }
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
