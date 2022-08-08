import Papa from 'papaparse';

export const setUp = () => {
  const app = document.getElementById('App');
  app.innerHTML = `
  <div class="mb-3">
    <label for="formFile" class="form-label">Upload your csv file</label>
    <input class="form-control" type="file" id="csv" accept=".csv">
  </div>

  <button type="button" class="btn btn-primary mb-2" id="parseData">Convert</button>

  <div id="table-data"></div>

  `;
};

export const setUpEventListener = () => {
  const inputBtn = document.getElementById('csv');
  const convertBtn = document.getElementById('parseData');
  const table = document.getElementById('table-data');

  convertBtn.addEventListener('click', async () => {
    if (inputBtn.files[0]) {
      const file = inputBtn.files[0];
      await Papa.parse(file, {
        complete: (results) => {
          const data = results.data;

          // generate table html
          table.innerHTML = `
          <table class="table">
            <thead>
              <tr>
                ${data[0].map((cell) => {
                  return `
                    <td>${cell}</td>
                    `;
                })}
              </tr>
            </thead>
            <tbody>
                ${data.slice(1).map((column) => {
                  return `
                      <tr>
                        ${column.map((cell) => {
                          return `
                              <td>${cell}</td>
                            `;
                        })}
                      </tr>
                    `;
                })}
              `;
          // set up event listener for table
        },
      });
    }
  });
};
