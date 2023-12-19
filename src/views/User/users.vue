<template>
  <div id="users">
    <div class="container">
      <!-- Add Edit Section -->
      <!-- @submit="onSubmit" @reset="onReset" -->
      <div class="add-section">
        <b-modal id="users-modal" title="users" @ok="submit">
          <b-form class="d-grid grid-cols-1 gap-5">
            <div class="feild">
              <label for="">Full Name</label>
              <b-form-input
                type="text"
                placeholder="Enter User Full Name"
                required
              ></b-form-input>
            </div>
            <div class="feild">
              <label for="">Email</label>
              <b-form-input
                type="email"
                placeholder="Enter User Email"
                required
              ></b-form-input>
            </div>
            <div class="feild">
              <label for="">Hotel Name</label>
              <v-select v-model="selected" placeholder="Select Hotel" :options="[1,2,3,4,5,6]" label="option" />
            </div>
            <div class="feild">
              <label for="">Password</label>
              <b-form-input
                type="Password"
                placeholder="Enter User Password"
                required
              ></b-form-input>
            </div>
          </b-form>
        </b-modal>
      </div>
      <!-- Filters Section -->
      <div class="filters-section"></div>
      <!-- Tabel Section -->
      <div class="table-sections">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Users List</h4>
          </template>
          <template v-slot:headerAction>
            <b-button variant="primary" @click="addInit" size="sm">New User</b-button>
          </template>
          <template v-slot:body>
            <b-table responsive :items="users.data" :fields="fields" class="mb-0 table-borderless">
                  <template v-slot:cell(img)="data">
                    <img :src="data.item.img" class="" alt="">
                  </template>
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
                v-model="filterData.current_page"
                :total-rows="filterData.total"
                :per-page="filterData.perPage"
            ></b-pagination>
          </template>
        </iq-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'governorates',
  data () {
    return {
      filterData: {
        current_page: 1,
        total: 100,
        perPage: 10
      },
      payload: {
        name: 'Husseinsb',
        phone: '07704205923',
        password: '123456',
        img: ''
      }
    }
  },
  computed: {
    fields () {
      return [
        {
          label: 'Image',
          key: 'img'
        },
        {
          label: 'Name',
          key: 'name'
        },
        {
          label: 'Phone',
          key: 'phone'
        },
        {
          label: 'Actions',
          key: 'actions'
        }
      ]
    }
  },
  methods: {
    addInit () {
      this.$bvModal.show('governorates-modal')
    },
    update (data) {
      Object.assign(this.payload, data)
      console.log(this.payload)
      this.$bvModal.show('governorates-modal')
    },
    remove (id) {
      this.confermMsg(() => {
        this.removeGovernorates(id)
      })
    },
    submit () {
      if (!this.payload.id) {
        this.addGovernorates(this.payload)
      } else {
        this.updateGovernorates(this.payload)
      }
    },
    changeStatus () {}
  },
  mounted () {
    this.getGovernorates()
  }
}
</script>
