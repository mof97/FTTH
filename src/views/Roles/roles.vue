<template>
    <div id="roles">
      <div class="container">
        <!-- Add Edit Section -->
        <!-- @submit="onSubmit" @reset="onReset" -->
        <div class="add-section">
          <b-modal id="roles-modal" title="Roles" @ok="submit">
            <b-form class="d-grid grid-cols-1 gap-5">
              <div class="feild">
                <label for="">Name</label>
                <b-form-input
                  type="text"
                  placeholder="Enter Name"
                  v-model="payload.name"
                  required
                ></b-form-input>
              </div>
              <div class="feild">
                <label for="">Guard Name</label>
                <v-select v-model="payload.guard_name" placeholder="Select Guard" :options="guards" label="option" :redus="(option)=>option" />
              </div>
              <div class="permissions">
                <h5 class="text-center mb-2">
                  Permissions
                </h5>
                <b-row>
                  <b-col sm="6" class="mb-1" v-for="(permission,index) in permissions.data" :key="index">
                    <div class="permission">
                        <b-form-checkbox :value="permission.id" v-model="payload.permissionIds" name="check-button" switch>
                        {{ permission.name }}
                        </b-form-checkbox>
                      </div>
                  </b-col>
                </b-row>
                {{ payload.permissionIds }}
              </div>
            </b-form>
          </b-modal>
        </div>
        <!-- Filters Section -->
        <div class="filters-section">
          <iq-card class="w-100">
            <template v-slot:body>
              <div class="filter-container" @change="filtering">
                <b-form-input
                  type="text"
                  placeholder="Filter By Name"
                  v-model="filterData.name"
                  required
                ></b-form-input>
              </div>
            </template>
          </iq-card>
        </div>
        <!-- Tabel Section -->
        <div class="table-sections">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Roles List</h4>
            </template>
            <template v-slot:headerAction>
              <b-button variant="primary" @click="addInit" size="sm">New Role</b-button>
            </template>
            <template v-slot:body>
              <b-table responsive :items="roles.data" :fields="fields" class="mb-0 table-borderless">
                <template v-slot:cell(actions)="data">
                    <div class="actions-list d-flex align-items-center">
                      <b-button variant=" iq-bg-success"  size="md" @click="update(data.item)"><i class="ri-ball-pen-fill p-0"></i></b-button>
                      <b-button variant=" iq-bg-danger"  size="md" @click="remove(data.item.id)"><i class="ri-delete-bin-line p-0"></i></b-button>
                    </div>
                  </template>
              </b-table>
            </template>
          </iq-card>
        </div>
        <!-- Pagination Section -->
        <div class="pagination">
          <iq-card class="w-100 d-flex justify-content-center">
            <template v-slot:body>
              <b-pagination
                  v-model="current_page"
                  :total-rows="governorates.total"
                  :per-page="filterData.take"
              ></b-pagination>
            </template>
          </iq-card>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  name: 'roles',
  data () {
    return {
      current_page: 1,
      filterData: {
        skip: 0,
        take: 10,
        name: ''
      },
      guards: [
        'admin',
        'Hotel',
        'Users',
        'Permissions',
        'Roles',
        'Services'
      ],
      payload: {
        name: 'delete-user',
        guard_name: 'admin',
        permissionIds: []
      }
    }
  },
  computed: {
    fields () {
      return [
        {
          label: 'Name',
          key: 'name'
        },
        {
          label: 'Guard Name',
          key: 'guard_name'
        },
        {
          label: 'Permissions Count',
          key: 'permissions.length'
        },
        // {
        //   label: 'Created Date',
        //   key: 'created_at'
        // },
        // {
        //   label: 'Created By',
        //   key: 'created_by.name'
        // },
        // {
        //   label: 'Updated Date',
        //   key: 'updated_at'
        // },
        // {
        //   label: 'Updated By',
        //   key: 'updated_by.name'
        // },
        {
          label: 'Actions',
          key: 'actions'
        }
      ]
    }
  },
  methods: {
    filtering () {
      this.getRoles(this.filterData)
    },
    addInit () {
      this.$bvModal.show('roles-modal')
    },
    update (data) {
      Object.assign(this.payload, data)
      data.permissions.map(el => {
        this.payload.permissionIds.push(el.id)
      })
      this.$bvModal.show('roles-modal')
    },
    remove (id) {
      this.confermMsg(() => {
        this.removeRoles(id)
      })
    },
    submit (bvModalEvent) {
      bvModalEvent.preventDefault()
      if (!this.payload.id) {
        this.addRoles(this.payload).then(() => {
          this.$bvModal.hide('roles-modal')
          this.payload = this.resetObject(this.payload)
        })
      } else {
        this.payload._method = 'PUT'
        this.updateRoles(this.payload).then(() => {
          this.$bvModal.hide('roles-modal')
          this.payload = this.resetObject(this.payload)
        })
      }
    },
    changeStatus () {}
  },
  watch: {
    current_page: {
      handler: function (value) {
        console.log(value)
        this.filterData.skip = value === 1 ? 0 : (this.filterData.take * value) - this.filterData.take
        this.filtering()
      },
      deep: true
    }
  },
  mounted () {
    this.getRoles()
    this.getPermissions()
  }
}
</script>
<style scoped>

  .permission{
    background-color: #e9e9e9;
    padding: 5px 10px;
    border-radius: 4px;
  }

</style>
