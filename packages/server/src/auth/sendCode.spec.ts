import { generateCode } from './sendCode'

describe('auth/sendCode',()=>{
  it("Should generate 7 digit unique code",()=>{
    const codes = new Set([])
    const iterations = 77
    for (let i = 0; i < iterations; i++) {
      const code = generateCode();
      expect(code.length).toBe(7)
      expect(codes.has(code)).toBe(false)
      codes.add(code)
    }
    expect(codes.size).toBe(iterations)
  })
})
