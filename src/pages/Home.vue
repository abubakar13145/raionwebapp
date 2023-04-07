<template>
  <div class="content-part">
    <div class="title-block">
      <h1 class="">{{ title }}</h1>

      <div class="btn-block">
        <div class="dropdown">
          <a href="javascript:void(0);" class="btn btn-outline-primary dropdown-toggle" role="button"
            id="dropdownMenuExportLink" data-bs-toggle="dropdown" aria-expanded="false">
            Export</a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuExportLink">
            <li>
              <a class="dropdown-item" href="javascript:void(0);" @click="downloadPdf()">
                <i class="icon">
                  <img src="../assets/images/icon-pdf.svg" alt="" class="" />
                </i>
                PDF file
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="javascript:void(0);" @click="downloadExcel()">
                <i class="icon">
                  <img src="../assets/images/icon-excel.svg" alt="" class="" />
                </i>
                Excel file
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <a href="javascript:void(0);" class="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuAddLink"
            data-bs-toggle="dropdown" aria-expanded="false">Add</a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuAddLink">
            <li>
              <a class="dropdown-item" href="#AddProductModalToggle" data-bs-toggle="modal" role="button"
                @click="newProduct">
                <i class="icon">
                  <img src="../assets/images/icon-box-white.svg" alt="" class="" />
                </i>
                New Product
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#AddCategoryModalToggle" data-bs-toggle="modal" role="button">
                <i class="icon">
                  <img src="../assets/images/icon-folder-white.svg" alt="" class="" />
                </i>
                New Category
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#AddColumnModalToggle" data-bs-toggle="modal" role="button">
                <i class="icon">
                  <img src="../assets/images/icon-folder-white.svg" alt="" class="" />
                </i>
                New Column
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Datatable ref="datatable" @edit-clicked="editProductPressed" />
  </div>

  <div class="modal fade form-modal" id="AddProductModalToggle" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Add New Product</h5>
          <form>
            <div class="form-floating mb-28">
              <select class="form-select" v-model.trim="selectedParentProduct" aria-label="Default select example">
                <option v-for="product in parentProducts" :value="product">{{ product.name }}</option>
              </select>
            </div>
            <div class="form-floating mb-28">
              <select class="form-select" v-model.trim="selectedCategory" aria-label="Default select example">
                <option v-for="category in categories" :value="category">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput1" placeholder="Column 1"
                v-model.trim="productName" name="floatingInput1" :class="productError ? 'input-error' : ''" />
              <label for="floatingInput1">Name</label>
              <span class="error-msg" v-if="productError">
                {{ productError }}
              </span>
            </div>

            <div class="form-floating mb-3" v-for="column in newProductData">
              <input type="text" class="form-control" id="floatingInput2" placeholder="Column 2"
                v-model.trim="column.value" name="floatingInput2" :class="column.error ? 'input-error' : ''" />
              <label for="floatingInput2">{{ column.name }}</label>
              <span class="error-msg" v-if="column.error">
                {{ column.error }}
              </span>
            </div>

            <div class="btn-row modal-btn-row">
              <button type="button" class="btn btn-outline-primary btn-lg" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary btn-lg" :class="
                !productName
                  ? 'disabled'
                  : ''
              " data-bs-target="#productAddedModal" @click="checkForm($event)">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="AddCategoryModalToggle" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Add New Category</h5>
          <form>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput1" placeholder="" v-model.trim="newCategory" />
              <label for="floatingInput1">Name</label>
            </div>
            <h6 class="modal-sub-title">Select aditional features</h6>
            <div class="btn-row modal-btn-row">
              <button type="button" class="btn btn-outline-primary btn-lg" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary btn-lg" data-bs-target="#categoryAddedModal"
                data-bs-toggle="modal" data-bs-dismiss="modal" @click="addCategory()">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="AddColumnModalToggle" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Add New Column</h5>
          <form>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput1" placeholder=""
                v-model.trim="newColumnName" />
              <label for="floatingInput1">Name</label>
            </div>
            <div class="form-floating mb-28">
              <select class="form-select" v-model="newColumnType" aria-label="Default select example">
                <option selected value="0">Currency</option>
                <option value="1">Number</option>
                <option value="2">Text</option>
              </select>
            </div>
            <div class="form-floating mb-28" v-if="newColumnType == 2">
              <select class="form-select" v-model="newFormatType" aria-label="Default select example">
                <option selected value="0">None</option>
                <option value="1">Date</option>
                <option value="2">Regex</option>
              </select>
            </div>
            <div class="form-floating mb-3" v-if="newColumnType == 2 && newFormatType > 0">
              <input type="email" class="form-control" id="floatingInput1" placeholder="" v-model.trim="newFormat" />
              <label for="floatingInput1">Format</label>
            </div>
            <div class="form-floating mb-3" v-if="newColumnType == 2 && newFormatType == 2">
              <input type="email" class="form-control" id="floatingInput1" placeholder="" v-model.trim="example" />
              <label for="floatingInput1">Error Message</label>
              <span class="error-msg" v-if="exampleError">
                {{ exampleError }}
              </span>
            </div>
            <h6 class="modal-sub-title">Select aditional feature</h6>
            <div class="mb-28">
              <div class="checkbox-row mb-3" :class="newColumnMandatory ? 'checked-row' : ''">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2"
                    v-model="newColumnMandatory" />
                  <label class="form-check-label" for="flexCheckDefault2">
                    Mandatory
                  </label>
                </div>
              </div>
            </div>
            <div class="btn-row modal-btn-row">
              <button type="button" class="btn btn-outline-primary btn-lg" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary btn-lg" @click="addColumn()">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="categoryAddedModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center mb-3">
            <img src="../assets/images/icon-modal-right.svg" alt="" class="" />
          </div>
          <h5 class="modal-title mb-4">New category successfully added</h5>
          <div class="btn-row">
            <button type="button" class="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="columnAddedModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center mb-3">
            <img src="../assets/images/icon-modal-right.svg" alt="" class="" />
          </div>
          <h5 class="modal-title mb-4">New column successfully added</h5>
          <div class="btn-row">
            <button type="button" class="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="productAddedModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center mb-3">
            <img src="../assets/images/icon-modal-right.svg" alt="" class="" />
          </div>
          <h5 class="modal-title mb-4">New product successfully added</h5>
          <div class="btn-row">
            <button type="button" class="btn btn-outline-primary btn-lg w-100" data-bs-dismiss="modal">
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="editColumnsModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Edit Columns</h5>

          <draggable class="dragArea list-group w-full" :list="columns" @change="log">
            <div class="input-group-block mb-3" v-for="column in columns" :key="column.name">
              <input type="text" class="form-control" placeholder="Column name" aria-label="Columnname"
                v-bind:value="column.name" aria-describedby="" readonly />
            </div>
          </draggable>
          <div class="btn-row modal-btn-row">
            <button type="button" class="btn btn-outline-primary btn-lg" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary btn-lg" @click="updateOrder()"
              data-bs-dismiss="modal">Save</button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="modal fade form-modal" id="editColumnNameModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Edit Column Name</h5>
          <form>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput1" placeholder="" v-bind:value="editColumn" />
              <label for="floatingInput1">Column Name</label>
            </div>
            <div class="form-floating mb-28">
              <select class="form-select" aria-label="Default select example">
                <option selected>Unit</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <h6 class="modal-sub-title">Select aditional features</h6>
            <div class="mb-28">
              <div class="checkbox-row mb-3" :class="filtering ? 'checked-row' : ''">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="filtering" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Filtering
                  </label>
                </div>
              </div>
              <div class="checkbox-row mb-3" :class="mandatory ? 'checked-row' : ''">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" v-model="mandatory" />
                  <label class="form-check-label" for="flexCheckDefault2">
                    Mandatory
                  </label>
                </div>
              </div>
              <div class="checkbox-row" :class="visibleList ? 'checked-row' : ''">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3"
                    v-model="visibleList" />
                  <label class="form-check-label" for="flexCheckDefault3">
                    Visibility in the list
                  </label>
                </div>
              </div>
            </div>
            <div class="btn-row modal-btn-row justify-space-between">
              <a type="button" class="text-primary btn btn-link btn-lg px-0" href="#editColumnsModal"
                data-bs-toggle="modal" role="button">
                <i class="icon">
                  <img src="../assets/images/icon-arrow-left.svg" alt="" class="" />
                </i>
                Back
              </a>
              <button type="button" class="btn btn-primary btn-lg" data-bs-target="#categoryAddedModal"
                data-bs-toggle="modal" data-bs-dismiss="modal" @click="saveColumn()">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="EditProductModalToggle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="modal-title">Edit product</h5>
          <form>
            <div class="form-floating mb-28">
              <select class="form-select" v-model.trim="editProduct.parentProduct" aria-label="Default select example">
                <option v-for="product in parentProducts" :value="product.id">{{ product.name }}</option>
              </select>
            </div>
            <div class="form-floating mb-28">
              <select class="form-select" v-model.trim="editProduct.categoryId" aria-label="Default select example">
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput1" placeholder="Column 1"
                v-model.trim="editProduct.name" name="floatingInput1" :class="editProduct.error ? 'input-error' : ''" />
              <label for="floatingInput1">Name</label>
              <span class="error-msg" v-if="editProduct.error">
                {{ editProduct.error }}
              </span>
            </div>

            <div class="form-floating mb-3" v-for="value in editProduct.values">
              <input type="text" class="form-control" id="floatingInput2" placeholder="Column 2"
                v-model.trim="value.value" name="floatingInput2" :class="value.error ? 'input-error' : ''" />
              <label for="floatingInput2">{{ value.columnName }}</label>
              <span class="error-msg" v-if="value.error">
                {{ value.error }}
              </span>
            </div>

            <div class="btn-row modal-btn-row">
              <button type="button" class="btn btn-outline-primary btn-lg" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn btn-primary btn-lg" :class="
                !editProduct.name
                  ? 'disabled'
                  : ''
              " data-bs-target="#productAddedModal" @click="checkEditForm($event)">
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
import Datatable from "./../components/Datatable.vue";
import Sidebar from "./includes/Sidebar.vue";
import { VueDraggableNext } from 'vue-draggable-next';
import moment from 'moment';

import jQuery from "jquery";

const RegexParser = require("regex-parser");

const $ = jQuery;
window.$ = $;

export default {
  name: "HomePage",
  title() {
    return "Raion - Products";
  },
  components: {
    Datatable,
    Sidebar,
    draggable: VueDraggableNext
  },
  computed: {
    title: function() {
        return this.secondItem.value;
    }
  },
  inject: ["executeSettings", 'baseApp', 'secondItem'],
  created: function () {
    this.getColumns();

  },
  data() {
    return {
      errors: {},
      filtering: false,
      mandatory: false,
      visibleList: false,
      productName: '',
      productError: '',
      newProductData: [],
      columns: [],
      categories: [],
      newCategory: '',
      selectedCategory: null,
      selectedParentProduct: null,
      newColumnName: '',
      newColumnType: '0',
      newColumnMandatory: true,
      newFormatType: 0,
      newFormat: '',
      example: '',
      exampleError: '',
      currentColumn: {
        id: '',
        name: ''
      },
      editColumn: '',
      renderComponent: true,
      products: [],
      parentProducts: [],
      editProduct: {
        "id": "",
        "parentProduct": null,
        "categoryId": "",
        "categoryName": "",
        "name": "",
        "updated": "",
        "values": [
        ]
      }
    };
  },
  methods: {
    log(event) {
      console.log(event)
    },
    enterSettings: function () {
      this.executeSettings(this.baseApp);
    },
    refresh() {
      this.$refs.datatable.refresh();
    },
    //New product form validation
    newProduct: function () {
      this.productName = '';
      this.selectedParentProduct = this.parentProducts[0];
      this.newProductData = this.columns.map((column) => {
        return {
          id: column.columnId,
          name: column.name,
          columnType: column.columnType,
          value: '',
          mandatory: column.mandatory,
          error: '',
          format: column.format,
          formatType: column.formatType,
          example: column.example
        };
      });
    },
    getProducts: function () {

      fetch(`${this.$hostname}/api/ProductTree/list`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.products = [];

          if (!response.products) {
            this.parentProducts = [{ id: null, name: "..." }];

            return;
          }

          response.products.forEach((product) => {
            product.isEdit = false;
            product.isCategoryEdit = false;
            product.selectedCategory = this.categories.find((x) => x.id === product.categoryId);
            product.selected = false;
            this.columns.forEach(column => {
              let val = product.values.find((x) => x.columnId == column.columnId);

              if (val) {
                val.isEdit = false;
                val.order = column.order;
                val.format = column.format;
                val.example = column.example;
              } else {
                let newVal = {
                  columnId: column.columnId,
                  columnName: column.name,
                  valueId: null,
                  value: null,
                  isEdit: false,
                  order: column.order,
                  format: column.format,
                  example: column.example
                };

                product.values.push(newVal);
              }

            });
            product.values.sort((a, b) => a.order - b.order);
          });

          this.products = response.products;
          this.parentProducts = [{ id: null, name: "..." }, ...response.products];

        });
    },
    shoeEdit: function () {
      var myModalEl = document.getElementById('EditProductModalToggle');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      if (!modal)
        modal = new bootstrap.Modal(myModalEl);

      modal.show();
    },
    checkEditForm: async function (e) {
      this.errors = [];
      var myModalEl = document.getElementById('EditProductModalToggle');
      var modal = bootstrap.Modal.getInstance(myModalEl);

      if (!this.editProduct.name)
        this.editProduct.error = 'Product name is mandatory';

      this.editProduct.values.forEach(value => {
        value.error = '';
        if (value.mandatory && !value.value)
          value.error = 'Column is mandatory';
        else if (value.value && !this.checkColumnFormat(value)) {
          value.error = 'Should be an integer';
        }
        else if (value.columnType == 2 && value.value) {
          if (value.formatType == 1 && !this.checkDateFormat(value)) {
            value.error = `Invalid date format ${value.format}`;
          }
          else if (value.formatType == 2 && !this.checkNumberFormat(value)) {
            value.error = `${value.example}`;
          }
        }
        else
          value.error = '';
      });

      if (this.editProduct.error || this.editProduct.values.find(value => value.error)) {

        return;
      }

      var result = {
        id: this.editProduct.id,
        categoryId: this.editProduct.categoryId,
        name: this.editProduct.name,
        productId: this.editProduct.parentProduct,
        values: this.editProduct.values.filter(product => product.valueId || product.value).map((productValue) => {
          return {
            valueId: productValue.valueId,
            columnId: productValue.columnId,
            columnType: productValue.columnType,
            value: productValue.value.toString()
          }
        })
      }

      let loader = this.$loading.show({
        canCancel: false
      });


      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      };

      fetch(`${this.$hostname}/Product/edit`, requestOptions)
        .then(response => response.json())
        .then(async data => {


          // Wait for the change to get flushed to the DOM
          await this.$nextTick();

          // Add the component back in
          this.refresh();
          loader.hide();
          modal.hide();
          this.getProducts();
        });
    },
    checkForm: async function (e) {
      this.errors = [];
      var myModalEl = document.getElementById('AddProductModalToggle');
      var modal = bootstrap.Modal.getInstance(myModalEl);

      if (!this.productName)
        this.productError = 'Product name is mandatory';

      this.newProductData.forEach(column => {
        column.error = '';
        if (column.mandatory && !column.value)
          column.error = 'Column is mandatory';
        else if (column.value && !this.checkColumnFormat(column)) {
          column.error = 'Should be an integer'
        }
        else if (column.columnType == 2 && column.value) {
          if (column.formatType == 1 && !this.checkDateFormat(column)) {
            column.error = `Invalid date format ${column.format}`;
          }
          else if (column.formatType == 2 && !this.checkNumberFormat(column)) {
            column.error = `${column.example}`;
          }
        }
        else
          column.error = '';
      });

      if (this.productError || this.newProductData.find(column => column.error)) {

        return;
      }

      var result = {
        categoryId: this.selectedCategory.id,
        name: this.productName,
        productId: this.selectedParentProduct.id,
        values: this.newProductData.filter(product => product.value != '').map((productValue) => {
          return {
            valueId: null,
            columnId: productValue.id,
            columnType: productValue.columnType,
            value: productValue.value
          }
        })
      }

      let loader = this.$loading.show({
        canCancel: false
      });


      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      };

      fetch(`${this.$hostname}/Product/add`, requestOptions)
        .then(response => response.json())
        .then(async data => {

          // Wait for the change to get flushed to the DOM
          await this.$nextTick();

          // Add the component back in

          loader.hide();
          this.refresh();
          modal.hide();
          this.getProducts();
        });
    },
    checkColumnFormat: function (column) {
      switch (column.columnType) {
        case 0:
          return !isNaN(column.value);
        case 1:
          return Number.isInteger(parseInt(column.value));
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
    editProductPressed: function (product) {
      this.editProduct = product;
      this.shoeEdit();

    },
    getColumns: function () {

      fetch(`${this.$hostname}/Column/columns`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.columns = response.columns;

          this.getCategories();
          this.getProducts();
        })
    },
    getCategories: function () {

      fetch(`${this.$hostname}/Product/categories/list`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.categories = response.categories;
          this.selectedCategory = this.categories[0];


        })
    },
    setCurrentColumn: function (column) {
      this.currentColumn = column;
      this.editColumn = column.name;
    },
    addCategory: function () {
      let result = {
        name: this.newCategory
      }

      let loader = this.$loading.show({
        canCancel: false
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      };

      fetch(`${this.$hostname}/Product/category/add`, requestOptions)
        .then(response => response.json())
        .then(async data => {
          // Wait for the change to get flushed to the DOM
          await this.$nextTick();

          // Add the component back in
          this.refresh();

          loader.hide();
        });
    },
    addColumn: function () {
      let el = document.getElementById('AddColumnModalToggle');
      let modal = bootstrap.Modal.getInstance(el);

      if (this.newFormatType == 2 && !this.example.trim()) {
        this.exampleError = 'Please enter meaningful hint how to fill this field';

        return;
      }

      let result = {
        name: this.newColumnName,
        columnType: Number(this.newColumnType),
        mandatory: this.newColumnMandatory,
        formatType: Number(this.newFormatType),
        format: this.newFormat,
        example: this.example
      }
      let loader = this.$loading.show({
        canCancel: false
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      };

      fetch(`${this.$hostname}/Column/column/add`, requestOptions)
        .then(response => response.json())
        .then(async data => {
          // Wait for the change to get flushed to the DOM
          await this.$nextTick();

          // Add the component back in
          this.refresh();
          loader.hide();
          modal.hide();
          this.getColumns();
        });
    },
    downloadExcel: function () {
      window.open(`${this.$hostname}/Export/excel`);
    },
    downloadPdf: function () {
      window.open(`${this.$hostname}/Export/pdf`);
    },
    saveColumn: function () {
      alert(this.editColumn);
    },
    updateOrder: function () {
      var order = this.columns.map(column => column.columnId);
      let result = {
        columnIds: order
      }

      let loader = this.$loading.show({
        canCancel: false
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
      };

      fetch(`${this.$hostname}/Column/order`, requestOptions)
        .then(response => response.json())
        .then(async data => {
          // Wait for the change to get flushed to the DOM
          await this.$nextTick();

          // Add the component back in
          this.refresh();
          loader.hide();
          this.getColumns();
        });
    }
  },
};
</script>

<style lang="scss">

</style>
