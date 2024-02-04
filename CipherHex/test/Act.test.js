const ACT = artifacts.require("ACTPOINTSMGMT");

contract('ACTPOINTSMGMT', (accounts) => {
	let act

	before (async () => {
		act = await ACT.deployed()
	})

	describe ('deployment', async () => {
		it('deploys successfully', async () => {
			const address = await act.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it ('Gets values', async () => {
			const ac = await act.getStudentInfo("ashwinajoyd.ai22@rvce.edu.in")
			assert.equal(ac['points'], 42)
		})

		it ('Updates stuff', async () => {
			const b = await act.setStudentInfo("ashwinajoyd.ai22@rvce.edu.in", 12)
			const c = await act.getStudentInfo("ashwinajoyd.ai22@rvce.edu.in")
			assert.equal(c['points'], 12)
		})
	})
})