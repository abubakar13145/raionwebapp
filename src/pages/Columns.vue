<template>
    <div class="content-part">
        <h1>Hello!!!</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="column in columns">
                    <td>{{ column.columnId }}</td>
                    <td>{{ column.name }}</td>
                    <td>{{ columnTypes[column.columnType] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DataTable from "datatables.net-dt";
const ColumnType = [
    "Currency",
    "Number",
    "Text"
];
export default {
    name: "ColumnsPage",
    title() {
        return "Raion - Columns";
    },
    created: function() {
        this.getColumns();
    },
    data() {
        return {
            columns: [],
            columnTypes: ColumnType
        }
    },  
    methods: {
        getColumns: function () {
            fetch(`${this.$hostname}/Column/columns`, {
                method: "GET"
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.columns = response.columns;
            })
        }
    }
}
</script>

<style lang="scss">

</style>